import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      position: "relative"
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography align='center'>
        All rights are reserved,{" "}
        <Link
          href='https://douara.me'
          title='Developer Website'
          underline='always'
          target='_blank'
        >
          www.douara.me
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
