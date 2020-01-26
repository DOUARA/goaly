import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faCheck,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    border: `1px solid ${theme.palette.gray.light}`,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap"
    }
  },
  colorBar: {
    background: "#D82F2F",
    width: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: 5
    }
  },
  goal: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(3),
    "&:hover ": {
      cursor: "pointer",
      "& div": {
        opacity: 1
      }
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  goalName: {
    flexGrow: 1
  },
  goalOptions: {
    opacity: 0,
    [theme.breakpoints.down("sm")]: {
      opacity: 1
    }
  },
  goalOptionIcon: {
    padding: theme.spacing(2),
    "& svg": {
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7
      }
    }
  },
  checkIcon: {
    "& path": {
      fill: theme.palette.success.main
    }
  },
  pencilIcon: {
    "& path": {
      fill: theme.palette.gray.dark
    }
  },
  trashIcon: {
    "& path": {
      fill: theme.palette.error.main
    }
  },
  deadLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3, 6),
    background: "#FFF5EB",
    fontSize: 14,
    color: theme.palette.primary.main,
    "& svg": {
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));

const Goal = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.colorBar}></div>
      <div className={classes.goal}>
        <div className={classes.goalName}>Learn NextJS</div>
        <div className={classes.goalOptions}>
          <span className={classes.goalOptionIcon}>
            <FontAwesomeIcon
              icon={faCheck}
              className={classes.checkIcon}
            ></FontAwesomeIcon>
          </span>
          <span className={classes.goalOptionIcon}>
            <FontAwesomeIcon
              icon={faPencilAlt}
              className={classes.pencilIcon}
            ></FontAwesomeIcon>
          </span>
          <span className={classes.goalOptionIcon}>
            <FontAwesomeIcon
              icon={faTrash}
              className={classes.trashIcon}
            ></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className={classes.deadLine}>
        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
        20-02-2020
      </div>
    </div>
  );
};

export default Goal;
