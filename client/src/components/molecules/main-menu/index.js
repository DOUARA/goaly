import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

// Component Style
const useStyles = makeStyles(theme => ({
  desktopMenu: {
    "& a": {
      marginLeft: theme.spacing(12),
      fontSize: "1rem",
      textDecoration: "none",
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.secondary.main
      }
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block"
    }
  },
  mobileDrawer: {
    "& ul": {
      width: 250
    },
    "& a": {
      display: "block",
      padding: theme.spacing(5)
    }
  },
  menuIcon: {
    width: "2.5em",
    height: "2.5em"
  }
}));

const MainMenu = () => {
  // Component States: Mobile Menu State
  const [opened, setOpened] = useState(false);

  // Component ClassNames
  const classes = useStyles();

  // Change Mobile Menu State
  const toggleMobileMenu = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpened(open);
  };

  // Menu links
  const menuLinks = (
    <ul>
      <Link href='https://douara.me' target='_blank'>
        About
      </Link>
      <NavLink to='/sign_up'>Sign Up</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </ul>
  );

  return (
    <Fragment>
      {/* Desktop Menu */}
      <div className={classes.desktopMenu}>{menuLinks}</div>
      {/* Mobile Menu */}
      <div className={classes.mobileMenu}>
        <IconButton
          edge='start'
          color='primary'
          aria-label='menu'
          onClick={toggleMobileMenu(true)}
        >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer
          anchor='right'
          open={opened}
          onClose={toggleMobileMenu(false)}
          className={classes.mobileDrawer}
        >
          {menuLinks}
        </Drawer>
      </div>
    </Fragment>
  );
};

export default MainMenu;
