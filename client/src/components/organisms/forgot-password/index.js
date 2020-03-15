import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "components/templates/modal";
import SocialButton from "components/atoms/social-button";
import Button from "@material-ui/core/Button";
import ButtomLink from "components/atoms/buttom-link";
import Input from "components/atoms/input";
import { NavLink, Redirect } from "react-router-dom";
import Alert from "components/molecules/alert";
import GoogleLogin from "react-google-login";

// Redux
import { connect } from "react-redux";
import { sendResetEmail, google_auth } from "store/actions/auth";
import { setAlert } from "store/actions/alert";

// Component Style
const useStyles = makeStyles(theme => ({
  inputLink: {
    display: "block",
    marginTop: "-20px",
    textAlign: "right",
    fontSize: 12,
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline"
    }
  },
  submitButton: {
    marginTop: theme.spacing(5)
  }
}));

const Login = ({ isAuthenticated, sendResetEmail, google_auth }) => {
  // Component State
  const [email, setEmail] = useState("");

  // Component ClassNames
  const classes = useStyles();

  // OnSubmit form
  const onSubmitForm = event => {
    event.preventDefault();
    sendResetEmail(email);
  };

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  // Google sign in
  const googleLoginSuccess = response => {
    google_auth(response.tokenId);
  };

  const googleLoginFailed = () => {
    setAlert("Google Login Failed", "error");
  };

  return (
    <Modal title='Password Reset'>
      <form noValidate autoComplete='off' onSubmit={onSubmitForm}>
        <Alert />
        <Input
          required
          id='outlined-basic'
          label='Email'
          type='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          variant='outlined'
        />
        <NavLink to='/login' className={classes.inputLink}>
          Login
        </NavLink>
        <Button
          variant='contained'
          color='secondary'
          className={classes.submitButton}
          type='submit'
        >
          Submit
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
        />{" "}
      </div>
      <ButtomLink to='/sign_up'>Sign Up</ButtomLink>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { sendResetEmail, google_auth })(Login);
