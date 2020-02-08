import React from "react";
import { Route } from "react-router-dom";
import SideBar from "./components/sidebar";
import TopBar from "./components/topbar";
import Container from "@material-ui/core/container";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile";
import Goals from "./goals/list";
import NewGoal from "./goals/new";
import NewCategory from "./categories/new";
import Categories from "./categories/list";
import PrivateRoute from "components/private-route";

// Component Style
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(10, 7),
    maxWidth: "960px",
    margin: "auto"
  }
}));

const Dashboard = () => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      <div style={{ width: "100%" }}>
        <TopBar />
        <Container className={classes.container}>
          <PrivateRoute path='/dashboard/profile' component={Profile} />
          <PrivateRoute exact path='/dashboard/goals' component={Goals} />
          <PrivateRoute exact path='/dashboard/new_goal' component={NewGoal} />
          <PrivateRoute
            exact
            path='/dashboard/new_category'
            component={NewCategory}
          />
          <PrivateRoute
            exact
            path='/dashboard/categories'
            component={Categories}
          />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
