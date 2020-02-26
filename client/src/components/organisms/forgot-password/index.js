import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "components/templates/modal";
import SocialButton from "components/atoms/social-button";
import Button from "@material-ui/core/Button";
import ButtomLink from "components/atoms/buttom-link";
import Input from "components/atoms/input";
import { NavLink, Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";

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

const Login = ({ isAuthenticated }) => {
  // Component ClassNames
  const classes = useStyles();

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Modal title='Password Reset'>
      <form noValidate autoComplete='off'>
        <Input
          id='outlined-basic'
          label='Email'
          type='email'
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

export default connect(mapStateToProps)(Login);
