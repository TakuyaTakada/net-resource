import React, { useState } from "react";
import { routeType } from "../../../routes";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore, Error } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import useStyles from "./Style";
import { Link } from "react-router-dom";

const NestedItem: React.FC<routeType> = ({
  name,
  path,
  exact,
  staffOnly,
  component,
  sidebarIcon,
  nestedItem
}): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>{sidebarIcon ? sidebarIcon : <Error />}</ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nestedItem
            ? nestedItem.map((route, idx) => {
                return (
                  <ListItem
                    key={idx}
                    button
                    className={classes.nested}
                    component={Link}
                    to={route.path}
                  >
                    <ListItemText primary={route.name} />
                  </ListItem>
                );
              })
            : null}
        </List>
      </Collapse>
    </>
  );
};

export default NestedItem;
