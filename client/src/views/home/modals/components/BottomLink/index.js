import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

// Component Style
const useStyles = makeStyles(theme => ({
  bottomLink: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
    "& a": {
      fontSize: 14,
      cursor: "pointer",
      textDecoration: "underline",
      color: theme.palette.primary.main,
      "&:hover": {
        textDecoration: "none"
      }
    }
  }
}));

const BottomLink = props => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <div className={classes.bottomLink}>
      <NavLink {...props}>{props.children}</NavLink>
    </div>
  );
};

export default BottomLink;
