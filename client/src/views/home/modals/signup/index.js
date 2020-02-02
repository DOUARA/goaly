import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";
import { Redirect } from "react-router-dom";
import Alert from "components/alert";

// Redux
import { connect } from "react-redux";
import { setAlert, removeAlerts } from "store/actions/alert";
import { register } from "store/actions/auth";

// Component Style
const useStyles = makeStyles(theme => ({
  rePassword: {
    marginTop: "-10px",
    width: "100%"
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
        <InputField
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          variant='outlined'
        />
        <InputField
          label='Password'
          name='password'
          value={password}
          onChange={onChange}
          type='password'
          variant='outlined'
        />
        <InputField
          label='Re-Password'
          name='password_two'
          value={password_two}
          onChange={onChange}
          type='password'
          variant='outlined'
          className={classes.rePassword}
        />
        <br></br>
        <SubmitButton
          type='submit'
          color='secondary'
          style={{ marginTop: "20px" }}
        >
          Sign Up
        </SubmitButton>
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
