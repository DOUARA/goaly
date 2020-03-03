import React, { useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GoogleIcon } from "./icons/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

// Redux
import { connect } from "react-redux";
import { updateName, updateRole, emailPassUpdate } from "store/actions/profile";
import { removeAlerts, setAlert } from "store/actions/alert";
import Alert from "components/molecules/alert";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      "& div": {
        display: "flex"
      }
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  avatar: {
    width: 200,
    height: 200
  },
  avatarFilter: {
    display: "none",
    position: "absolute",
    background: "#000",
    opacity: "0.6",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    "& svg": {
      width: "20px !important",
      height: "20px !important",
      "& path": {
        fill: "#fff"
      }
    }
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
      fontSize: "22px !important",
      textTransform: "capitalize"
    }
  },
  credentials: {
    marginTop: theme.spacing(10),
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
    marginTop: theme.spacing(5),
    paddingLeft: `${theme.spacing(8)}px !important`,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4)
    }
  },
  columnTitle: {
    marginBottom: theme.spacing(3)
  },
  button: {
    background: theme.palette.success.main,
    color: "#fff",
    marginBottom: theme.spacing(2),
    "&:hover": {
      background: theme.palette.success.main,
      opacity: "0.7"
    }
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 10),
    textAlign: "center",
    outline: 0,
    lineHeight: "30px"
  }
}));

const Profile = ({
  profile,
  updateName,
  updateRole,
  setAlert,
  emailPassUpdate,
  removeAlerts
}) => {
  // Component State
  const [profileData, setprofileData] = useState({
    name: profile.name,
    role: profile.role,
    email: profile.email,
    password: "placeholder",
    password2: "placeholder2"
  });
  const [avatarModal, setAvatarModal] = useState(false);

  // OnChange profileData
  const onChange = event => {
    setprofileData({ ...profileData, [event.target.name]: event.target.value });
  };

  // onSubmit Form
  const onSubmitForm = event => {
    event.preventDefault();
    if (profileData.password !== profileData.password2) {
      removeAlerts();
      return setAlert("Passwords don't match", "error");
    }
    removeAlerts();
    return emailPassUpdate(profileData.email, profileData.password);
  };

  // Component ClassNames
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item md='3' xs='12' className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            alt='Remy Sharp'
            src={profile.avatar}
          />
          <div
            className={classes.avatarFilter}
            onClick={() => setAvatarModal(true)}
          >
            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
          </div>
          <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={avatarModal}
            className={classes.modal}
            onClose={() => setAvatarModal(false)}
          >
            <div className={classes.paper}>
              <p id='simple-modal-description'>
                We are using gravatar service to set profile pictures,
                <br />
                for more information checkout{" "}
                <a target='_blank' href='https://en.gravatar.com/'>
                  this link
                </a>
              </p>
            </div>
          </Modal>
        </Grid>
        <Grid item md='6' xs='12' className={classes.mainInfo}>
          <InputBase
            placeholder='Your full name'
            inputProps={{ "aria-label": "naked" }}
            value={profileData.name}
            name='name'
            onChange={onChange}
            onBlur={() => {
              if (profile.name && profileData.name) {
                if (
                  profile.name.toLowerCase() != profileData.name.toLowerCase()
                ) {
                  updateName(profileData.name);
                }
              } else {
                updateName(profileData.name);
              }
            }}
            className={classes.fullName}
          />
          <InputBase
            placeholder='Role'
            name='role'
            onChange={onChange}
            inputProps={{ "aria-label": "naked" }}
            value={profileData.role}
            onBlur={() => {
              if (profile.role && profileData.role) {
                if (
                  profile.role.toLowerCase() != profileData.role.toLowerCase()
                ) {
                  updateRole(profileData.role);
                }
              } else {
                updateRole(profileData.role);
              }
            }}
          />
        </Grid>
        <Grid item md='3' xs='12'></Grid>
      </Grid>
      <Alert className={classes.alert}></Alert>
      <Grid container spacing={3}>
        <Grid item md='6' xs='12' className={classes.credentials}>
          <form autoComplete='off' onSubmit={onSubmitForm}>
            <TextField
              required
              id='outlined-required'
              label='Email'
              type='email'
              name='email'
              onChange={onChange}
              value={profileData.email}
              variant='outlined'
            />
            <TextField
              required
              id='outlined-required'
              label='Password'
              type='password'
              name='password'
              onChange={onChange}
              defaultValue='placeholder'
              variant='outlined'
            />
            <TextField
              required
              id='outlined-required'
              label='Re-password'
              type='password'
              name='password2'
              onChange={onChange}
              defaultValue='placeholder'
              variant='outlined'
            />
            <Button type='submit' className={classes.button}>
              Save
            </Button>
          </form>
        </Grid>
        <Grid item md='6' xs='12' className={classes.linkedAccounts}>
          <Typography
            variant='h3'
            component='h3'
            className={classes.columnTitle}
          >
            Linked Accounts
          </Typography>
          <Box>
            <GoogleIcon></GoogleIcon>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  updateRole,
  updateName,
  setAlert,
  emailPassUpdate,
  removeAlerts
})(Profile);
