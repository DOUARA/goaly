import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GoogleIcon } from "./icons/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  avatar: {
    width: 200,
    height: 200
  },

  mainInfo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& input": {
      color: theme.palette.primary.main,
      padding: theme.spacing(2, 0),
      fontSize: "20px",
      textAlign: "center",
      borderRadius: "8px",
      border: "1px solid #ffffff",
      "&:hover": {
        border: `1px solid ${theme.palette.gray.light}`
      },
      "&:focus": {
        border: `1px solid ${theme.palette.gray.light}`
      }
    }
  },

  fullName: {
    fontWeight: 700,
    "& input": {
      fontSize: "22px !important"
    }
  },

  credentials: {
    marginTop: theme.spacing(15),
    "& .MuiFormControl-root": {
      display: "block",
      marginBottom: theme.spacing(8),
      "& .MuiInputBase-root": {
        display: "block",
        width: "100%"
      }
    }
  },

  linkedAccounts: {
    marginTop: theme.spacing(10),
    paddingLeft: `${theme.spacing(8)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4)
    },
    "& .MuiTypography-root": {
      marginBottom: theme.spacing(3)
    }
  },

  twitterIcon: {
    width: "30px !important",
    height: "auto",
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
    "& path": {
      fill: theme.palette.gray.main
    }
  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item md='3' xs='12' className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            alt='Remy Sharp'
            src='https://cv.douara.me/images/main_photo.jpg'
          />
        </Grid>
        <Grid item md='6' xs='12' className={classes.mainInfo}>
          <InputBase
            placeholder='Your full name'
            inputProps={{ "aria-label": "naked" }}
            defaultValue='Abderrahman DOUARA'
            className={classes.fullName}
          />
          <InputBase
            placeholder='Your job'
            inputProps={{ "aria-label": "naked" }}
            defaultValue='JavaScript Developer'
          />
          <InputBase
            placeholder='Your Birthday'
            inputProps={{ "aria-label": "naked" }}
            type='date'
            defaultValue='27 Years old'
          />
        </Grid>
        <Grid item md='3' xs='12'></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md='6' xs='12' className={classes.credentials}>
          <TextField
            required
            id='outlined-required'
            label='Email'
            type='email'
            defaultValue='aer17013@gmail.com'
            variant='outlined'
          />
          <TextField
            required
            id='outlined-required'
            label='Password'
            type='password'
            defaultValue='mypassword'
            variant='outlined'
          />
        </Grid>
        <Grid item md='6' xs='12' className={classes.linkedAccounts}>
          <Typography variant='h3' component='h3'>
            Linked Accounts
          </Typography>

          <Box>
            <GoogleIcon></GoogleIcon>
            <FontAwesomeIcon
              icon={faTwitter}
              className={classes.twitterIcon}
            ></FontAwesomeIcon>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
