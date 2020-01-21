import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Login from "../../../modals/login";
import SignUp from "../../../modals/signup";

import { Route, NavLink, HashRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menu: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    "& a": {
      marginLeft: theme.spacing(12),
      fontSize: "1rem",
      textDecoration: "none",
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  },
  mobileMenu: {
    marginLeft: 0,
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
    <HashRouter>
      <ul className={menuClassName}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/sign_up'>Sign Up</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </ul>
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/sign_up' component={SignUp} />
      </div>
    </HashRouter>
  );
};

export default Navigation;
