import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../../components/core/logo";
import Menu from "./components/menu/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  AppBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    paddingTop: theme.spacing(6)
  },
  menuButton: {
    marginRight: theme.spacing(12)
  },
  title: {
    flexGrow: 1
  }
}));
const Header = () => {
  const classes = useStyles();
  return (
    <Container>
      <AppBar position='static' className={classes.AppBar}>
        <Toolbar>
          <Logo className={classes.root} />
          <Menu />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
