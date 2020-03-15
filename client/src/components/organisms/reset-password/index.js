import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "components/templates/modal";
import SocialButton from "components/atoms/social-button";
import Button from "@material-ui/core/Button";
import ButtomLink from "components/atoms/buttom-link";
import Input from "components/atoms/input";
import { Redirect } from "react-router-dom";
import Alert from "components/molecules/alert";
// Redux
import { connect } from "react-redux";
import { setAlert } from "store/actions/alert";
import { resetPassword, google_auth } from "store/actions/auth";
import GoogleLogin from "react-google-login";

// Component Style
const useStyles = makeStyles(theme => ({
  rePassword: {
    marginTop: "-10px",
    width: "100%"
  },
  submitButton: {
    marginTop: theme.spacing(5)
  }
}));

const PasswordReset = ({
  setAlert,
  resetPassword,
  google_auth,
  isAuthenticated,
  match
}) => {
  // Component State
  const [formData, setFormData] = useState({
    password: "",
    password_two: ""
  });

  // token
  const { token } = match.params;

  // Component ClassNames
  const classes = useStyles();

  // State Change Handeling
  const { password, password_two } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmitForm = event => {
    event.preventDefault();
    if (password !== password_two) {
      return setAlert("Passwords don't match", "error");
    }
    resetPassword(token, password);
  };

  const googleSignUpSuccess = response => {
    google_auth(response.tokenId);
  };

  const googleSignUpFailed = () => {
    setAlert("Google SignUp Failed", "error");
  };

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Modal title='Password Reset'>
      <form autoComplete='off' onSubmit={onSubmitForm}>
        <Alert></Alert>
        <Input
          label='Password'
          name='password'
          value={password}
          onChange={onChange}
          type='password'
          variant='outlined'
        />
        <Input
          label='Re-Password'
          name='password_two'
          value={password_two}
          onChange={onChange}
          type='password'
          variant='outlined'
          className={classes.rePassword}
        />
        <br></br>
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
              Sign up with Google
            </SocialButton>
          )}
          onSuccess={googleSignUpSuccess}
          onFailure={googleSignUpFailed}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <ButtomLink to='/login'>Login</ButtomLink>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  setAlert,
  google_auth,
  resetPassword
})(PasswordReset);
