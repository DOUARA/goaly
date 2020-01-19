import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import heroImg from "../../../assets/hero.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  heroContainer: {
    // background: "gray"
  },
  leftSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    padding: "15px 45px",
    marginRight: theme.spacing(7)
  }
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <Container className={classes.heroContainer}>
      <Grid container spacing={3}>
        <Grid item xs='6' className={classes.leftSide}>
          <Typography variant='h1' component='h1'>
            Put your Life Together with the Best Tracking Goals Software of all
            Time
            <div className={classes.buttonGroup}>
              <Button
                variant='contained'
                className={classes.button}
                color='primary'
              >
                Join for Free!
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                color='secondary'
              >
                Login
              </Button>
            </div>
          </Typography>
        </Grid>
        <Grid item xs='6' className={classes.rightSide}>
          <img src={heroImg}></img>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
