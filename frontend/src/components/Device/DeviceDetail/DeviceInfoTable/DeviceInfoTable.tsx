import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import useStyles from "../Style";

export type DeviceInfo = {
  title: string;
  value: string;
};

type DeviceInfoProps = {
  info: DeviceInfo[];
};

const DeviceInfoTable: React.FC<DeviceInfoProps> = ({ info }): JSX.Element => {
  const classes = useStyles();
  const InfoRows = info.map((i, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell className={classes.headCell}>{i.title}</TableCell>
        <TableCell>{i.value}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <Table>
        <TableBody>{InfoRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceInfoTable;
