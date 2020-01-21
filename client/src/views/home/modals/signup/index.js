import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import Link from "@material-ui/core/Link";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";
import createSpacing from "@material-ui/core/styles/createSpacing";

const useStyles = makeStyles(theme => ({
  rePassword: {
    marginTop: "-10px"
  }
}));

const Login = () => {
  const classes = useStyles();
  return (
    <Modal title='Sign Up'>
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
        <InputField
          id='outlined-basic'
          label='Re-Password'
          type='password'
          variant='outlined'
          style={{ marginTop: "-10px" }}
        />
        <SubmitButton color='secondary' style={{ marginTop: "20px" }}>
          Sign Up
        </SubmitButton>
      </form>
      <div>
        <SocialButton>Sign up with Google</SocialButton>
        <SocialButton provider='twitter'>Sign up with Twitter</SocialButton>
      </div>
      <ButtomLink>Login</ButtomLink>
    </Modal>
  );
};

export default Login;
