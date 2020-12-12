import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import routes from "../../../routes";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NestedItem from "../NestedItem/NestedItem";

const MainListItems: React.FC = (): JSX.Element => {
  return (
    <div>
      {routes.map((route, idx) => {
        if (route.sidebarIcon) {
          if (route.nestedItem) {
            return <NestedItem key={idx} {...route} />;
          } else {
            return (
              <ListItem key={idx} button component={Link} to={route.path}>
                <ListItemIcon>{route.sidebarIcon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default MainListItems;
