import React from "react";
import { Route } from "react-router-dom";
import SideBar from "./components/sidebar";
import TopBar from "./components/topbar";
import Container from "@material-ui/core/container";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile";
import Goals from "./goals/list";
import NewGoal from "./goals/new";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(10, 7),
    maxWidth: "960px",
    margin: "unset",
    margin: "auto"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      <div style={{ width: "100%" }}>
        <TopBar />
        <Container className={classes.container}>
          <Route path='/dashboard/profile' component={Profile} />
          <Route path='/dashboard/goals' component={Goals} />
          <Route path='/dashboard/new_goal' component={NewGoal} />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
