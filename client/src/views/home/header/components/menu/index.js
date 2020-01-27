import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Navigation from "../navigation";

// Component Style
const useStyles = makeStyles(theme => ({
  side: {
    width: 250
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block"
    }
  },
  menuIcon: {
    width: "2.5em",
    height: "2.5em"
  }
}));

const Menu = () => {
  // Component States
  const [opened, setOpened] = useState(false);

  // Component ClassNames
  const classes = useStyles();

  // Toggle Mobile Menu
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpened(open);
  };

  // Mobile Menu Markup
  const sideMenu = () => (
    <div
      className={classes.side}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Navigation mobile={true} />
    </div>
  );

  return (
    <Fragment>
      <Navigation />
      <div className={classes.mobileMenu}>
        <IconButton
          edge='start'
          color='primary'
          aria-label='menu'
          onClick={toggleDrawer(true)}
        >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer anchor='right' open={opened} onClose={toggleDrawer(false)}>
          {sideMenu()}
        </Drawer>
      </div>
    </Fragment>
  );
};

export default Menu;
