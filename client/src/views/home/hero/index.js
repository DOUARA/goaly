import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import heroImg from "../../../assets/hero.png";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  leftSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      paddingTop: theme.spacing(25),
      paddingBottom: theme.spacing(25),
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3)
    }
  },
  rightSide: {
    "& img": {
      maxWidth: "100%"
    }
  },
  buttonGroup: {
    marginTop: theme.spacing(12)
  },

  button: {
    boxShadow: "none",
    padding: "12px 35px",
    marginRight: theme.spacing(7)
  },

  signUp: {
    [theme.breakpoints.down("md")]: {}
  },

  login: {
    [theme.breakpoints.down("sm")]: {
      background: "none",
      textDecoration: "underline",
      fontWeight: 600,
      color: theme.palette.secondary.main,
      "&:hover": {
        background: "none"
      }
    }
  }
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <Container className={classes.heroContainer}>
      <Grid container>
        <Grid item lg='6' className={classes.leftSide}>
          <Typography variant='h1' component='h1'>
            Put your Life Together with the Best Tracking Goals Software of all
            Time
            <div className={classes.buttonGroup}>
              <Button
                variant='contained'
                className={classnames(classes.button, classes.signUp)}
                color='primary'
              >
                Join for Free!
              </Button>
              <Button
                variant='contained'
                className={classnames(classes.button, classes.login)}
                color='secondary'
              >
                Login
              </Button>
            </div>
          </Typography>
        </Grid>
        <Grid item lg='6' className={classes.rightSide}>
          <img src={heroImg}></img>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
