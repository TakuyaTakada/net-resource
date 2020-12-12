import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import useStyles from "./Style";
import MainListItems from "./MainListItems/MainListItems";
// import { SecondaryListItems } from "./SideDrawerItems/SecondaryListItems";

type PropsType = {
  open: boolean;
  handleClose(): void;
};

const SideDrawer: React.FC<PropsType> = ({
  open,
  handleClose
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainListItems />
      </List>
      <Divider />
      {/*<List>{SecondaryListItems}</List>*/}
    </Drawer>
  );
};

export default SideDrawer;
