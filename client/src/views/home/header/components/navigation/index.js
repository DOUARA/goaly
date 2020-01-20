import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
const useStyles = makeStyles(theme => ({
  menu: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    "& a": {
      marginRight: theme.spacing(12),
      fontSize: "1rem",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  },
  mobileMenu: {
    display: "block",
    "& a": {
      display: "block",
      padding: theme.spacing(5)
    }
  }
}));

const Navigation = props => {
  const classes = useStyles();
  const { mobile } = props;
  let menuClassName = classes.menu;
  if (mobile) {
    menuClassName = classnames(classes.mobileMenu, classes.menu);
  }
  return (
    <ul className={menuClassName}>
      <Link href='#'>About</Link>
      <Link href='#'>Sign Up</Link>
      <Link href='#'>Login</Link>
    </ul>
  );
};

export default Navigation;
