import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

// Component Style
const useStyles = makeStyles(theme => ({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: theme.spacing(8),
    "& a:hover": {
      textDecoration: "underline"
    },
    [theme.breakpoints.down("md")]: {
      position: "relative"
    }
  }
}));

const Footer = () => {
  // Component ClassNames
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography align='center'>
        Created with Love ❤️ by{" "}
        <Link
          href='https://douara.me'
          title='Developer Website'
          underline='always'
          target='_blank'
        >
          DOUARA
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
