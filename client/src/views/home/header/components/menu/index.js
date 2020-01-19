import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menu: {
    "& a": {
      marginRight: theme.spacing(12),
      fontSize: "1rem",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  }
}));

const Menu = () => {
  const classes = useStyles();
  return (
    <ul className={classes.menu}>
      <Link href='#'>About</Link>
      <Link href='#'>Sign Up</Link>
      <Link href='#'>Login</Link>
    </ul>
  );
};

export default Menu;
