import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  bottomLink: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
    "& a": {
      fontSize: 14,
      cursor: "pointer",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none"
      }
    }
  }
}));

const BottomLink = props => {
  const classes = useStyles();
  return (
    <div className={classes.bottomLink}>
      <Link color='primary'>{props.children}</Link>
    </div>
  );
};

export default BottomLink;
