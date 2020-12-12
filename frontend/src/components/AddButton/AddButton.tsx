import React from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./Style";

type PropsType = {
  handleCreateOpen(): void;
};

const AddButton: React.FC<PropsType> = ({ handleCreateOpen }) => {
  const classes = useStyles();
  return (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.fab}
      size="small"
      onClick={handleCreateOpen}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
