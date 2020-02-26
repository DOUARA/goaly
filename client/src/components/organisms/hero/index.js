import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import heroImg from "assets/hero.png";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

// Component Style
const useStyles = makeStyles(theme => ({
  leftSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      padding: theme.spacing(23, 3)
    }
  },
  rightSide: {
    "& img": {
      maxWidth: "100%"
    }
  },
  buttonGroup: {
    marginTop: theme.spacing(12),
    alignItems: "flex-start",
    width: "100%"
  },
  button: {
    boxShadow: "none",
    padding: "12px 35px",
    marginRight: theme.spacing(7),
    "& a": {
      textDecoration: "none"
    }
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
  // Component ClassNames
  const classes = useStyles();

  return (
    <Container className={classes.heroContainer}>
      <Grid container>
        <Grid item lg={6} className={classes.leftSide}>
          <Typography variant='h1' component='h1' className={classes.heading}>
            Put your Life Together with the Best Tracking Goals Software of all
            Time
          </Typography>

          <div className={classes.buttonGroup}>
            <NavLink to='/sign_up'>
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
              >
                Join for Free!
              </Button>
            </NavLink>
            <NavLink to='/login'>
              <Button
                variant='contained'
                className={classnames(classes.button, classes.login)}
                color='secondary'
              >
                Login
              </Button>
            </NavLink>
          </div>
        </Grid>
        <Grid item lg={6} className={classes.rightSide}>
          <img src={heroImg} alt='Hero' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
