import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { DEVICE_LIST_FOR_RACK_QUERY } from "../../../../../graphql/queries/deviceQueries";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { DEVICE_BULK_UPDATE_MUTATION } from "../../../../../graphql/mutations/deviceMutations";
import { useParams } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { GetDevicesForRack_getDevices } from "../../../../../graphql/queries/__generated__/GetDevicesForRack";
import { GetRack_getRack_devices } from "../../../../../graphql/queries/__generated__/GetRack";

type PropsType = {
  selectDeviceOpen: boolean;
  handleClose(): void;
  handleDevices(devices: GetRack_getRack_devices[]): void;
};

const SelectDeviceDialog: React.FC<PropsType> = ({
  selectDeviceOpen,
  handleClose,
  handleDevices
}): JSX.Element | null => {
  const { id } = useParams();
  const [devices, setDevices] = useState<GetDevicesForRack_getDevices[]>([]);
  const [checked, setChecked] = useState<GetDevicesForRack_getDevices[]>([]);
  const handleToggle = (device: GetDevicesForRack_getDevices) => () => {
    const currentIndex = checked.findIndex(d => d.id === device.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(device);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const [requestBulkUpdateDevice, { loading: updateLoading }] = useMutation(
    DEVICE_BULK_UPDATE_MUTATION,
    {
      refetchQueries: [
        {
          query: DEVICE_LIST_FOR_RACK_QUERY,
          variables: { input: { rackId: id, positionIsNull: true } }
        }
      ],
      awaitRefetchQueries: true
    }
  );
  const onRequestBulkUpdateDevice = () => {
    const update = checked.map(dev => {
      return {
        id: dev.id,
        rackId: id
      };
    });
    const unchecked = devices
      .filter(dev => !checked.includes(dev) && dev.rack)
      .map(dev => {
        return {
          id: dev.id,
          rackId: ""
        };
      });
    requestBulkUpdateDevice({
      variables: {
        input: {
          devices: [...update, ...unchecked]
        }
      }
    });
    handleClose();
    handleDevices(checked);
  };
  const { loading, error, data } = useQuery(DEVICE_LIST_FOR_RACK_QUERY, {
    variables: { input: { rackIdOrNull: id, positionIsNull: true } },
    onCompleted: data => {
      setDevices(data.getDevices);
      const checkedDevices = data.getDevices.filter(
        (dev: GetDevicesForRack_getDevices) => dev.rack && dev.rack.id === id
      );
      setChecked(checkedDevices);
    }
  });
  if (!selectDeviceOpen) {
    return null;
  }
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
  const deviceList = devices.map((device, idx) => {
    return (
      <ListItem key={idx} onClick={handleToggle(device)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.findIndex(d => d.id === device.id) !== -1}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={device.name} />
      </ListItem>
    );
  });
  return (
    <Dialog
      fullWidth={true}
      open={selectDeviceOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Select Device</DialogTitle>
      <DialogContent>
        <List>{deviceList}</List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onRequestBulkUpdateDevice}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectDeviceDialog;
