import React, { Fragment } from "react";
import Header from "./components/header";
import Filters from "./components/filters";
import Goal from "./components/goal";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  goals: {
    margin: theme.spacing(5, 0)
  }
}));

const List = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Header></Header>
      <Filters></Filters>
      <div className={classes.goals}>
        <Goal></Goal>
        <Goal></Goal>
        <Goal></Goal>
      </div>
    </Fragment>
  );
};

export default List;
