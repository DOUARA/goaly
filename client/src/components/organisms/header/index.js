import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "components/atoms/logo";
import MainMenu from "components/molecules/main-menu";

const useStyles = makeStyles(theme => ({
  AppBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    paddingTop: theme.spacing(6),
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2)
    }
  },
  logo: {
    flexGrow: 1
  }
}));
const Header = () => {
  const classes = useStyles();
  return (
    <Container>
      <AppBar position='static' className={classes.AppBar}>
        <Toolbar>
          <Logo className={classes.logo} />
          <MainMenu />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
