import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import Link from "@material-ui/core/Link";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";

const useStyles = makeStyles(theme => ({
  inputLink: {
    display: "block",
    marginTop: "-20px",
    textAlign: "right",
    fontSize: 12,
    cursor: "pointer"
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
        <Link className={classes.inputLink}>I forgot my password</Link>
        <SubmitButton color='secondary'>Login</SubmitButton>
      </form>
      <div>
        <SocialButton>Sign in with Google</SocialButton>
        <SocialButton provider='twitter'>Sign in with Twitter</SocialButton>
      </div>
      <ButtomLink>Sign Up</ButtomLink>
    </Modal>
  );
};

export default Login;
