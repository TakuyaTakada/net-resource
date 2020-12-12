import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Select,
  CircularProgress,
  Toolbar,
  Typography,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Edit, Delete } from "@material-ui/icons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { PORT_STATUSES } from "../../../../const";
import useStyles from "../Style";
import { GetPorts_getPorts } from "../../../../graphql/queries/__generated__/GetPorts";
import { useMutation } from "@apollo/react-hooks";
import {
  PORT_BULK_CREATE_MUTATION,
  PORT_BULK_DELETE_MUTATION,
  PORT_UPDATE_MUTATION
} from "../../../../graphql/mutations/portMutations";
import { PORT_LIST_AND_DEVICE_DETAIL_QUERY } from "../../../../graphql/queries/portQueris";
import { useParams } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { BulkCreatePortInput } from "../../../../../__generated__/globalTypes";
import { DialogFields } from "../../../../types";
import CreateDialog from "../../../CreateDialog/CreateDialog";

type InterfaceTableProps = {
  ports: GetPorts_getPorts[];
};

const InterfaceTable: React.FC<InterfaceTableProps> = ({
  ports
}): JSX.Element => {
  const classes = useStyles();
  const { id } = useParams();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const initialCreateInput = {
    prefix: "",
    startNum: 0,
    endNum: 0,
    status: 1,
    deviceId: id ? id : ""
  };
  const [createParam, setCreateParam] = useState<{
    input: BulkCreatePortInput;
  }>({
    input: initialCreateInput
  });
  const handleCreateOpen = () => {
    setCreateDialogOpen(true);
  };
  const handleCreateClose = () => {
    setCreateDialogOpen(false);
  };
  const handleCreateInput = (input: { input: BulkCreatePortInput }) => {
    setCreateParam(input);
  };
  const handleCreateDisabled = (params: any) => {
    return !(
      params.prefix !== "" &&
      params.status !== 0 &&
      params.startNum !== null &&
      params.endNum !== null &&
      params.deviceId !== ""
    );
  };
  const [editRow, setEditRow] = useState("");
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(0);
  const [editNote, setEditNote] = useState("");
  const initializeEditParam = () => {
    setEditName("");
    setEditStatus(0);
    setEditNote("");
    setChecked([]);
  };
  const [checked, setChecked] = useState<string[]>([]);
  const queryInput = { portInput: { deviceId: id }, deviceInput: { id: id } };
  const [requestUpdatePort, { loading: updateLoading }] = useMutation(
    PORT_UPDATE_MUTATION,
    {
      refetchQueries: [
        {
          query: PORT_LIST_AND_DEVICE_DETAIL_QUERY,
          variables: queryInput
        }
      ],
      awaitRefetchQueries: true
    }
  );
  const onRequestUpdatePort = () => {
    requestUpdatePort({
      variables: {
        input: {
          id: editRow,
          name: editName,
          status: editStatus,
          note: editNote
        }
      }
    });
  };
  const [requestBulkDeletePort, { loading: deleteLoading }] = useMutation(
    PORT_BULK_DELETE_MUTATION,
    {
      refetchQueries: [
        {
          query: PORT_LIST_AND_DEVICE_DETAIL_QUERY,
          variables: queryInput
        }
      ],
      awaitRefetchQueries: true
    }
  );
  const onRequestBulkDeletePort = () => {
    requestBulkDeletePort({
      variables: {
        input: {
          ids: checked
        }
      }
    });
    setChecked([]);
  };
  const handleClick = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const checkedIndex = checked.indexOf(id);
    let newChecked: string[] = [];

    if (checkedIndex === -1) {
      newChecked = newChecked.concat(checked, id);
    } else if (checkedIndex === 0) {
      newChecked = newChecked.concat(checked.slice(1));
    } else if (checkedIndex === checked.length - 1) {
      newChecked = newChecked.concat(checked.slice(0, -1));
    } else if (checkedIndex > 0) {
      newChecked = newChecked.concat(
        checked.slice(0, checkedIndex),
        checked.slice(checkedIndex + 1)
      );
    }
    setChecked(newChecked);
  };
  const isChecked = (id: string) => checked.indexOf(id) !== -1;
  useEffect(() => {
    if (editRow) {
      const p = ports.find(port => port.id === editRow);
      if (p) {
        if (editName === "") {
          setEditName(p.name);
        }
        if (editStatus === 0) {
          setEditStatus(p.status);
        }
        if (editNote === "") {
          setEditNote(p.note ? p.note : "");
        }
      }
    }
  }, [editRow, editName, editStatus, editNote, ports]);
  if (updateLoading || deleteLoading) {
    return (
      <Backdrop open={updateLoading || deleteLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }
  const portRows = ports.map(port => {
    const status = PORT_STATUSES.find(status => status.value === port.status);
    const isCheckedRow = isChecked(port.id);
    if (editRow === port.id) {
      return (
        <TableRow key={port.id}>
          <TableCell padding="checkbox">
            <IconButton
              color="primary"
              onClick={() => {
                onRequestUpdatePort();
                initializeEditParam();
                setEditRow("");
              }}
            >
              <CheckCircleIcon />
            </IconButton>
          </TableCell>
          <TableCell padding="checkbox">
            <IconButton
              onClick={() => {
                initializeEditParam();
                setEditRow("");
              }}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <TextField
              id={`edit-name-${port.id}`}
              size="small"
              value={editName}
              onChange={ev => setEditName(ev.target.value)}
            />
          </TableCell>
          <TableCell>
            <Select
              id={`edit-status=${port.id}`}
              value={editStatus}
              onChange={ev => setEditStatus(ev.target.value as number)}
            >
              <MenuItem value={0}>----</MenuItem>
              {PORT_STATUSES.map(({ value, text }, idx) => (
                <MenuItem key={idx} value={value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <TextField
              id={`edit-note-${port.id}`}
              size="small"
              value={editNote}
              onChange={ev => setEditNote(ev.target.value)}
            />
          </TableCell>
        </TableRow>
      );
    }
    return (
      <TableRow key={port.id}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isCheckedRow}
            onChange={ev => handleClick(ev, port.id)}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={() => {
              initializeEditParam();
              setEditRow(port.id);
            }}
          >
            <Edit />
          </IconButton>
        </TableCell>
        <TableCell>{port.name}</TableCell>
        <TableCell>{status ? status.text : ""}</TableCell>
        <TableCell>{port.note}</TableCell>
      </TableRow>
    );
  });

  const createFields: DialogFields = [
    {
      name: "prefix",
      label: "Prefix",
      required: true,
      multiline: false
    },
    {
      name: "startNum",
      label: "First Port ID",
      required: true,
      multiline: false
    },
    {
      name: "endNum",
      label: "Last Port ID",
      required: true,
      multiline: false
    },
    {
      name: "status",
      label: "Status",
      transList: PORT_STATUSES
    }
  ];

  return (
    <>
      <CreateDialog
        createOpen={createDialogOpen}
        handleCreateClose={handleCreateClose}
        createMutation={PORT_BULK_CREATE_MUTATION}
        createMutationInput={createParam}
        handleCreateInput={handleCreateInput}
        listQuery={PORT_LIST_AND_DEVICE_DETAIL_QUERY}
        searchInput={queryInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={createFields}
      />
      <Paper>
        <Toolbar>
          <Typography style={{ flex: "1 1 60%" }}>Ports</Typography>
          {checked.length ? (
            <Tooltip title="delete">
              <IconButton
                color="secondary"
                onClick={() => {
                  onRequestBulkDeletePort();
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="add">
              <IconButton
                style={{ color: "#2ac916" }}
                onClick={handleCreateOpen}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell padding="checkbox"></TableCell>
                <TableCell className={classes.headCell}>Interface</TableCell>
                <TableCell className={classes.headCell}>Status</TableCell>
                <TableCell className={classes.headCell}>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{portRows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default InterfaceTable;
