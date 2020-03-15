import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "components/templates/modal";
import SocialButton from "components/atoms/social-button";
import Button from "@material-ui/core/Button";
import ButtomLink from "components/atoms/buttom-link";
import Input from "components/atoms/input";
import { NavLink, Redirect } from "react-router-dom";
import Alert from "components/molecules/alert";
import GoogleLogin from "react-google-login";
import { useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { login, google_auth, activateEmail } from "store/actions/auth";
import { removeAlerts, setAlert } from "store/actions/alert";

// Component Style
const useStyles = makeStyles(theme => ({
  inputLink: {
    display: "block",
    marginTop: "-20px",
    textAlign: "right",
    fontSize: 12,
    cursor: "pointer",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  submitButton: {
    marginTop: theme.spacing(10)
  }
}));

const Login = ({
  removeAlerts,
  setAlert,
  login,
  isAuthenticated,
  google_auth,
  activateEmail,
  match
}) => {
  // Component State
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  // Current url location
  const location = useLocation();

  // Activating email
  useEffect(() => {
    if (location.pathname.indexOf("/verify") !== -1) {
      if (match.params) {
        const { token } = match.params;
        activateEmail(token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // onChange state
  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  // OnSubmit form
  const onSubmitForm = event => {
    event.preventDefault();
    removeAlerts();
    login({ email, password });
  };

  // Component ClassNames
  const classes = useStyles();

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const googleLoginSuccess = response => {
    google_auth(response.tokenId);
  };

  const googleLoginFailed = () => {
    setAlert("Google Login Failed", "error");
  };

  return (
    <Modal title='Login'>
      <form noValidate autoComplete='off' onSubmit={onSubmitForm}>
        <Alert></Alert>
        <Input
          id='outlined-basic'
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          variant='outlined'
        />
        <Input
          id='outlined-basic'
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          variant='outlined'
        />
        <NavLink to='/forgot_password' className={classes.inputLink}>
          I forgot my password
        </NavLink>
        <Button
          variant='contained'
          color='secondary'
          className={classes.submitButton}
          type='submit'
        >
          Login
        </Button>
      </form>
      <div>
        <GoogleLogin
          clientId='705269927168-rbgjlqon92hl4ta0ec46e6hqej0b3bsm.apps.googleusercontent.com'
          render={renderProps => (
            <SocialButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in with Google
            </SocialButton>
          )}
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginFailed}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <ButtomLink to='/sign_up'>Sign Up</ButtomLink>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  removeAlerts,
  setAlert,
  login,
  google_auth,
  activateEmail
})(Login);
