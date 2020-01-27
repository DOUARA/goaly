import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

// Component Style
const useStyles = makeStyles(theme => ({
  inputField: {
    width: 350,
    maxWidth: "100%",
    marginBottom: theme.spacing(6),
    "& legend": {
      width: "80px"
    }
  }
}));
const InputField = props => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <Fragment>
      <TextField className={classes.inputField} {...props} />
    </Fragment>
  );
};

export default InputField;
