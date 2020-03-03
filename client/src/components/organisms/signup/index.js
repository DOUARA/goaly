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
import { setAlert, removeAlerts } from "store/actions/alert";
import { register } from "store/actions/auth";

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

const SignUp = ({ removeAlerts, setAlert, register, isAuthenticated }) => {
  // Component State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_two: ""
  });

  // Component ClassNames
  const classes = useStyles();

  // State Change Handeling
  const { email, password, password_two } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmitForm = event => {
    event.preventDefault();
    removeAlerts();
    if (password !== password_two) {
      return setAlert("Passwords don't match", "error");
    }
    register({ email, password });
  };

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Modal title='Sign Up'>
      <form autoComplete='off' onSubmit={onSubmitForm}>
        <Alert></Alert>
        <Input
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          variant='outlined'
        />
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
        <SocialButton>Sign up with Google</SocialButton>
        <SocialButton provider='twitter'>Sign up with Twitter</SocialButton>
      </div>
      <ButtomLink to='/login'>Login</ButtomLink>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, removeAlerts, register })(
  SignUp
);
