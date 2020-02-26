import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

// Component Style
const useStyles = makeStyles(theme => ({
  inputLink: {
    display: "block",
    marginTop: "-20px",
    textAlign: "right",
    fontSize: 12,
    cursor: "pointer",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const InputLink = props => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <NavLink to={props.link} className={classes.inputLink} {...props}>
      {props.children}
    </NavLink>
  );
};

// default props and proptypes
InputLink.defaultProps = {
  link: "#"
};

InputLink.PropTypes = {
  link: PropTypes.string
};

export default inputLink;
