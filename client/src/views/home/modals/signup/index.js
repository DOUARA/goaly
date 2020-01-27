import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";

// Component Style
const useStyles = makeStyles(theme => ({
  rePassword: {
    marginTop: "-10px"
  }
}));

const Login = () => {
  // Component ClassNames
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
          className={classes.rePassword}
        />
        <SubmitButton color='secondary' style={{ marginTop: "20px" }}>
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

export default Login;
