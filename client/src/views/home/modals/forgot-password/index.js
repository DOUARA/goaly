import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";
import SocialButton from "../components/SocialButton";
import SubmitButton from "../components/SubmitButton";
import ButtomLink from "../components/BottomLink";
import InputField from "../components/InputField";
import { NavLink } from "react-router-dom";

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
  }
}));

const Login = () => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <Modal title='Password Reset'>
      <form noValidate autoComplete='off'>
        <InputField
          id='outlined-basic'
          label='Email'
          type='email'
          variant='outlined'
        />
        <NavLink to='/login' className={classes.inputLink}>
          Login
        </NavLink>
        <SubmitButton color='secondary' style={{ marginTop: "15px" }}>
          Submit
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

export default Login;
