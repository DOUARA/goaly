import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GoogleIcon } from "./icons/google.svg";
import { ReactComponent as TwitterIcon } from "./icons/twitter.svg";
import classnames from "classnames";

// Component Style
const useStyles = makeStyles(theme => ({
  socialButton: {
    width: 250,
    height: 50,
    fontSize: 14,
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    marginTop: theme.spacing(2),
    borderRadius: 7,
    borderColor: theme.palette.gray.light,
    "& svg": {
      width: 25,
      height: 25,
      paddingRight: 20
    }
  },
  twitterButton: {
    background: "#55ADEE",
    color: "#ffffff",
    "& svg": {
      marginRight: "5px",
      marginBottom: "5px",
      "& path": {
        fill: "#ffffff"
      }
    },
    "&:hover": {
      background: "#ffffff",
      color: "#55ADEE",
      "& svg path": {
        fill: "#55ADEE"
      }
    }
  }
}));

const SocialIcon = props => {
  // Component ClassNames
  const classes = useStyles();
  let className = classes.socialButton;
  if (props.provider === "twitter") {
    className = classnames(classes.socialButton, classes.twitterButton);
  }

  return (
    <Fragment>
      <Button className={className} variant='outlined'>
        {props.provider === "twitter" ? <TwitterIcon /> : <GoogleIcon />}
        {props.children}
      </Button>
    </Fragment>
  );
};

export default SocialIcon;
