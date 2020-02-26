import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

// Component Style
const useStyles = makeStyles(theme => ({
  input: {
    width: props => `${props.width}px`,
    maxWidth: "100%",
    marginBottom: theme.spacing(6),
    "& legend": {
      width: "80px"
    }
  }
}));
const Input = props => {
  // Component ClassNames
  const classes = useStyles(props);

  return (
    <Fragment>
      <TextField className={classes.input} {...props} />
    </Fragment>
  );
};

// Default props and proptypes
Input.defaultProps = {
  width: "350"
};

Input.propTypes = {
  width: PropTypes.string
};

export default Input;
