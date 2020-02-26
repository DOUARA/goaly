import React, { Fragment } from "react";
import PropTypes from "prop-types";
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

const SocialButton = props => {
  // Component ClassNames
  const classes = useStyles();

  // classname according to the provider
  let className = classes.socialButton;
  if (props.provider === "twitter") {
    className = classnames(classes.socialButton, classes.twitterButton);
  }

  // button icon according to the provider
  let icon;
  switch (props.provider) {
    case "google":
    default:
      icon = <GoogleIcon />;
      break;
    case "twitter":
      icon = <TwitterIcon />;
      break;
  }

  return (
    <Fragment>
      <Button className={className} variant='outlined' {...props}>
        {icon}
        {props.children}
      </Button>
    </Fragment>
  );
};

// Default props and proptypes
SocialButton.defaultProps = {
  provider: "google"
};

SocialButton.propTypes = {
  provider: PropTypes.string
};

export default SocialButton;
