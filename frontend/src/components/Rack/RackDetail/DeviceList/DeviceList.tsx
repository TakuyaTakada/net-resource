import React, { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@apollo/react-hooks";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DEVICE_LIST_FOR_RACK_QUERY } from "../../../../graphql/queries/deviceQueries";
import {
  Paper,
  Typography,
  Container,
  List,
  ListItem,
  Button
} from "@material-ui/core";
import useStyles from "../Style";
import { GetRack_getRack_devices } from "../../../../graphql/queries/__generated__/GetRack";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import SelectDeviceDialog from "./SelectDeviceDialog/SelectDeviceDialog";

type PropsType = {
  devices: GetRack_getRack_devices[];
  devicesInRack: (GetRack_getRack_devices | null)[];
  handleDevices(devices: GetRack_getRack_devices[]): void;
};

const ItemContainer = styled.div``;

const ListContainer = styled.div``;

const DeviceList: React.FC<PropsType> = ({
  devices,
  devicesInRack,
  handleDevices
}): JSX.Element => {
  const classes = useStyles();
  const { id } = useParams();
  const [selectDeviceOpen, setSelectDeviceOpen] = useState(false);
  const { loading, error, data } = useQuery(DEVICE_LIST_FOR_RACK_QUERY, {
    variables: { input: { rackId: id, positionIsNull: true } },
    onCompleted: data => {
      handleDevices(data.getDevices);
    }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;

  const handleSelectDeviceOpen = () => {
    setSelectDeviceOpen(true);
  };
  const handleSelectDeviceClose = () => {
    setSelectDeviceOpen(false);
  };
  const isIncludeDevicesInRack = (name: string) => {
    const names = devicesInRack.map(device => (device ? device.name : null));
    return names.includes(name);
  };
  const ListItems: React.FC = () => {
    return (
      <Droppable droppableId="deviceList">
        {provided => (
          <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
            {devices
              .filter(
                (device: GetRack_getRack_devices | null) =>
                  !isIncludeDevicesInRack(device ? device.name : "")
              )
              .map((device, idx) => (
                <Draggable draggableId={device.id} index={idx} key={device.id}>
                  {provided => (
                    <ItemContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItem
                        button
                        className={
                          !device
                            ? clsx(classes.listItem, classes.blank)
                            : classes.listItem
                        }
                      >
                        <Box height={device.deviceModel.height * 20}>
                          {`${device.name} (${device.deviceModel.name})`}
                        </Box>
                      </ListItem>
                    </ItemContainer>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    );
  };

  return (
    <>
      {selectDeviceOpen ? (
        <SelectDeviceDialog
          selectDeviceOpen={selectDeviceOpen}
          handleClose={handleSelectDeviceClose}
          handleDevices={handleDevices}
        />
      ) : null}
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6">Device List</Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSelectDeviceOpen}
              >
                Select
              </Button>
            </Grid>
          </Grid>
          <Container maxWidth="sm">
            <List>
              <ListItems />
            </List>
          </Container>
        </Paper>
      </Grid>
    </>
  );
};

export default DeviceList;
