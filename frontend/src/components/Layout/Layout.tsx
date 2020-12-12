import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import useStyles from "./Style";
import routes from "../../routes";
import TopNavbar from "./TopNavbar/TopNavbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BottomNav from "./BottomNav/BottomNav";

const Layout: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopNavbar open={drawerOpen} handleOpen={handleDrawerOpen} />
      <SideDrawer open={drawerOpen} handleClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            {routes.map((route, idx) => {
              if (route.nestedItem) {
                return route.nestedItem.map((childRoute, childIdx) => {
                  return (
                    <Route
                      key={childIdx}
                      path={childRoute.path}
                      exact={childRoute.exact}
                      children={childRoute.component}
                    />
                  );
                });
              } else {
                return route && route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    children={route.component}
                  />
                ) : null;
              }
            })}
          </Switch>
          <br />
          <BottomNav />
          <br />
          {/*<Copyright />*/}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
