import React, { useState } from "react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import { RACK_DETAIL_QUERY } from "../../../graphql/queries/rackQueries";
import {
  Paper,
  Typography,
  Container,
  List,
  ListItem,
  CircularProgress,
  Button
} from "@material-ui/core";
import useStyles from "./Style";
import { GetRack_getRack_devices } from "../../../graphql/queries/__generated__/GetRack";
import { DEVICE_BULK_UPDATE_MUTATION } from "../../../graphql/mutations/deviceMutations";
import Backdrop from "@material-ui/core/Backdrop";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import DeviceList from "./DeviceList/DeviceList";
import { DEVICE_LIST_FOR_RACK_QUERY } from "../../../graphql/queries/deviceQueries";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { UpdateDeviceInput } from "../../../../__generated__/globalTypes";

const ItemContainer = styled.div``;

const ListContainer = styled.div``;

function calcPosition(devices: (GetRack_getRack_devices | null)[]) {
  let position = 1;
  const newDevices = devices.map(device => {
    if (device) {
      device.position = position;
      position = position + device.deviceModel.height;
      return device;
    } else {
      position++;
      return null;
    }
  });
  return newDevices;
}

const RackDetail: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [devicesInRack, setDevicesInRack] = useState<
    (GetRack_getRack_devices | null)[]
  >([]);
  const [devices, setDevices] = useState<GetRack_getRack_devices[]>([]);
  const handleDevices = (devices: GetRack_getRack_devices[]) => {
    setDevices(devices);
  };
  const handleSnackbar = (height: number) => {
    enqueueSnackbar(`Need ${height} blank units`, { variant: "error" });
  };
  const [requestBulkUpdateDevice, { loading: updateLoading }] = useMutation(
    DEVICE_BULK_UPDATE_MUTATION,
    {
      refetchQueries: [
        {
          query: RACK_DETAIL_QUERY,
          variables: { input: { id: id } }
        },
        {
          query: DEVICE_LIST_FOR_RACK_QUERY,
          variables: { input: { rackId: id, positionIsNull: true } }
        }
      ],
      awaitRefetchQueries: true
    }
  );
  const onRequestBulkUpdateDevice = () => {
    const mounting: UpdateDeviceInput[] = devicesInRack
      .filter(Boolean)
      .map(d => {
        if (!d) {
          return {
            id: ""
          };
        } else {
          return {
            id: d.id,
            position: d.position
          };
        }
      });
    const notMounting: UpdateDeviceInput[] = devices.filter(Boolean).map(d => {
      return {
        id: d.id,
        position: 0
      };
    });
    requestBulkUpdateDevice({
      variables: {
        input: {
          devices: [...mounting, ...notMounting]
        }
      }
    });
  };
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const srcDevices: any =
      source.droppableId === "rackLayout" ? devicesInRack : devices;
    const dstDevices: any =
      destination.droppableId === "rackLayout" ? devicesInRack : devices;
    if (srcDevices === dstDevices) {
      if (source.droppableId === "deviceList") {
        return;
      }
      let [device] = srcDevices.splice(source.index, 1);
      srcDevices.splice(destination.index, 0, device);
      if (source.droppableId === "rackLayout") {
        const newDevices = calcPosition(srcDevices);
        setDevicesInRack(newDevices);
      }
    } else {
      if (source.droppableId === "deviceList") {
        if (!dstDevices[destination.index]) {
          const height = srcDevices[source.index].deviceModel.height;
          if (height > 1) {
            for (let i = 1; i < height; i++) {
              if (dstDevices[destination.index + i]) {
                handleSnackbar(height);
                return;
              }
            }
          }
          let [device] = srcDevices.splice(source.index, 1);
          dstDevices.splice(destination.index, height, device);
          const newDevices = calcPosition(dstDevices);
          setDevicesInRack(newDevices);
          setDevices(srcDevices);
        } else {
          handleSnackbar(srcDevices[source.index].deviceModel.height);
          return;
        }
      } else {
        const height = srcDevices[source.index].deviceModel.height;
        let blank = [];
        for (let i = 0; i < height; i++) {
          blank[i] = null;
        }
        let [device] = srcDevices.splice(source.index, 1, ...blank);
        device.rackId = "";
        device.position = 0;
        dstDevices.splice(destination.index, 0, device);
        setDevicesInRack(srcDevices);
        setDevices(dstDevices);
      }
    }
  };
  const { loading, error, data } = useQuery(RACK_DETAIL_QUERY, {
    variables: { input: { id: id } },
    onCompleted: data => {
      let devices = [];
      let index = 0;
      for (let count = 0; count < data.getRack.units; count++) {
        const device = data.getRack.devices
          ? data.getRack.devices.find(
              (device: GetRack_getRack_devices) => device.position === count + 1
            )
          : null;
        if (device) {
          devices[index] = device;
          count = count + device.deviceModel.height - 1;
          index++;
        } else {
          devices[index] = null;
          index++;
        }
      }
      setDevicesInRack(devices);
    }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;
  if (updateLoading) {
    return (
      <Backdrop open={updateLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }
  const ListItems: React.FC = () => {
    return (
      <Droppable
        droppableId="rackLayout"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => (
          <ItemContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <ListItem
              button
              className={
                !devicesInRack[rubric.source.index]
                  ? clsx(classes.listItem, classes.blank)
                  : classes.listItem
              }
            >
              {devicesInRack[rubric.source.index] ? (
                <Box
                  height={
                    // @ts-ignore
                    devicesInRack[rubric.source.index].deviceModel.height * 20
                  }
                  // @ts-ignore
                >{`${devicesInRack[rubric.source.index].name} (${
                  // @ts-ignore
                  devicesInRack[rubric.source.index].deviceModel.name
                })`}</Box>
              ) : (
                <Box height={20}>Blank</Box>
              )}
            </ListItem>
          </ItemContainer>
        )}
      >
        {provided => (
          <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
            {devicesInRack.map((device, idx) => (
              <Draggable
                draggableId={device ? device.id : `blank-${idx}`}
                index={idx}
                key={idx}
              >
                {provided => (
                  <ItemContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <ListItem
                      button
                      className={
                        !device
                          ? clsx(classes.listItem, classes.blank)
                          : classes.listItem
                      }
                    >
                      {device ? (
                        <Box
                          height={device.deviceModel.height * 20}
                        >{`${device.name} (${device.deviceModel.name})`}</Box>
                      ) : (
                        <Box height={20}>Blank</Box>
                      )}
                    </ListItem>
                  </ItemContainer>
                )}
              </Draggable>
            ))}
          </ListContainer>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h6">Rack Layout</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={onRequestBulkUpdateDevice}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <Container maxWidth="sm" className={classes.container}>
              <List className={classes.list}>
                <ListItems />
              </List>
            </Container>
          </Paper>
        </Grid>
        <DeviceList
          devices={devices}
          devicesInRack={devicesInRack}
          handleDevices={handleDevices}
        />
      </Grid>
    </DragDropContext>
  );
};

export default RackDetail;
