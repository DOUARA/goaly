import React, { Fragment, useEffect } from "react";
import Header from "./components/header";
import Category from "./components/category";
import { makeStyles } from "@material-ui/core/styles";
// Redux
import { connect } from "react-redux";
import { getCategories } from "store/actions/cats";
import Alert from "components/alert";

// Component Style
const useStyles = makeStyles(theme => ({
  goals: {
    margin: theme.spacing(5, 0)
  }
}));

const List = ({ cats, getCategories }) => {
  // Component ClassNames
  const classes = useStyles();
  useEffect(() => {
    getCategories();
  }, []);

  const catsItems = cats.map(cat => (
    <Category
      name={cat.name}
      color={cat.color}
      goalsNumber={cat.goalsNumber}
      id={cat._id}
    />
  ));

  return (
    <Fragment>
      <Header></Header>
      <Alert />
      <div className={classes.goals}>{catsItems}</div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  cats: state.cats
});

export default connect(mapStateToProps, { getCategories })(List);
