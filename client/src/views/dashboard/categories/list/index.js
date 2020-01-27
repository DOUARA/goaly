import React, { Fragment } from "react";
import Header from "./components/header";
import Category from "./components/category";
import { makeStyles } from "@material-ui/core/styles";

// Component Style
const useStyles = makeStyles(theme => ({
  goals: {
    margin: theme.spacing(5, 0)
  }
}));

const List = () => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <Fragment>
      <Header></Header>
      <div className={classes.goals}>
        <Category></Category>
        <Category></Category>
        <Category></Category>
      </div>
    </Fragment>
  );
};

export default List;
