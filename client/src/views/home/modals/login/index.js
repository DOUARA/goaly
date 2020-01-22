import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";
import { NavLink } from "react-router-dom";

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

const Login = () => {
  const classes = useStyles();
  return (
    <Modal title='Login'>
      <form noValidate autoComplete='off'>
        <InputField
          id='outlined-basic'
          label='Email'
          type='email'
          variant='outlined'
        />
        <InputField
          id='outlined-basic'
          label='Password'
          type='password'
          variant='outlined'
        />
        <NavLink to='/forgot_password' className={classes.inputLink}>
          I forgot my password
        </NavLink>
        <SubmitButton color='secondary'>Login</SubmitButton>
      </form>
      <div>
        <SocialButton>Sign in with Google</SocialButton>
        <SocialButton provider='twitter'>Sign in with Twitter</SocialButton>
      </div>
      <ButtomLink to='/sign_up'>Sign Up</ButtomLink>
    </Modal>
  );
};

export default Login;
