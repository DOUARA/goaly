import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(15)
  },

  rightSide: {
    textAlign: "right",

    "& button": {
      padding: theme.spacing(2, 4, 2, 4),
      background: theme.palette.success.main,
      color: "#ffffff",
      borderRadius: "4px",
      "&:hover": {
        background: theme.palette.success.light
      },
      "& svg": {
        padding: theme.spacing(0, 2, 0, 0)
      }
    }
  }
}));

const Header = () => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md='6' xs='12' className={classes.leftSide}>
        <Typography variant='h2' component='h2'>
          Categories
        </Typography>
      </Grid>
      <Grid item md='6' xs='12' className={classes.rightSide}>
        <NavLink to='/dashboard/new_category'>
          <Button variant='contained'>
            <FontAwesomeIcon icon={faPlus}> </FontAwesomeIcon>Add New
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default Header;
