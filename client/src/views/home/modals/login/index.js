import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";
import { NavLink, Redirect } from "react-router-dom";
import Alert from "components/alert";

// Redux
import { connect } from "react-redux";
import { login } from "store/actions/auth";
import { removeAlerts } from "store/actions/alert";

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
  }
}));

const Login = ({ removeAlerts, login, isAuthenticated }) => {
  // Component State
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

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

  return (
    <Modal title='Login'>
      <form noValidate autoComplete='off' onSubmit={onSubmitForm}>
        <Alert></Alert>
        <InputField
          id='outlined-basic'
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          variant='outlined'
        />
        <InputField
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
        <SubmitButton type='submit' color='secondary'>
          Login
        </SubmitButton>
      </form>
      <div>
        <SocialButton>Sign in with Google</SocialButton>
        <SocialButton provider='twitter'>Sign in with Twitter</SocialButton>
      </div>
      <ButtomLink to='/sign_up'>Sign Up</ButtomLink>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { removeAlerts, login })(Login);
