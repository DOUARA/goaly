import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Component Style
const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(10),
    textTransform: "capitalize",
    width: 120,
    height: 45
  }
}));

const SubmitButton = props => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        variant='contained'
        color={props.color}
        className={classes.button}
        {...props}
      >
        {props.children}
      </Button>
    </Fragment>
  );
};

export default SubmitButton;
