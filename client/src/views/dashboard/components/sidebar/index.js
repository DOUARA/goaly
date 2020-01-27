import React, { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Logo from "../../../../components/logo";
import { makeStyles } from "@material-ui/core/styles";
import SideBarMenu from "../sidebar-menu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";

// Component Style
const useStyles = makeStyles(theme => ({
  logo: {
    "& svg": {
      width: 85
    }
  },
  header: {
    background: theme.palette.primary.dark,
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    background: theme.palette.primary.main,
    width: 250,
    height: "100vh",
    postion: "relative",
    boxShadow: `1px 0px 1px ${theme.palette.gray.dark}`
  },
  footer: {
    position: "absolute",
    width: "250px",
    bottom: 0,
    color: "#ffffff",
    fontSize: "14px",
    textAlign: "center",
    padding: theme.spacing(3),
    background: theme.palette.primary.dark,
    "& a": {
      color: "#ffffff",
      display: "block",
      textDecoration: "underline"
    }
  },
  mobileSideBar: {
    display: "none",
    height: "60px",
    width: 80,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.primary.main,
      color: "#ffffff"
    },
    "& svg": {
      fill: "#fff"
    },
    "& button": {
      marginLeft: 0
    }
  },
  menuIcon: {
    width: "2.5em",
    height: "2.5em"
  },
  desktopSideBar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  }
}));

const SideBar = () => {
  // Component Style
  const [opened, setopened] = useState(false);

  // Component ClassNames
  const classes = useStyles();

  // SideBar Markup
  const renderSideBar = (
    <Box className={classes.main}>
      <Box className={classes.header}>
        <Logo color='white' className={classes.logo}></Logo>
      </Box>
      <SideBarMenu></SideBarMenu>
      <Box className={classes.footer}>
        All rights are reserved ©
        <Link href='https://douara.me'>www.douara.me</Link>
      </Box>
    </Box>
  );

  // Toggle Drawer State
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setopened(open);
  };

  // Mobile Sidebar Markup
  const mobileSideBar = (
    <div
      className={classes.side}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {renderSideBar}
    </div>
  );

  return (
    <Fragment>
      <div className={classes.mobileSideBar}>
        <IconButton
          edge='start'
          color='primary'
          aria-label='menu'
          onClick={toggleDrawer(true)}
        >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer anchor='left' open={opened} onClose={toggleDrawer(false)}>
          {mobileSideBar}
        </Drawer>
      </div>
      <div className={classes.desktopSideBar}>{renderSideBar}</div>
    </Fragment>
  );
};

export default SideBar;
