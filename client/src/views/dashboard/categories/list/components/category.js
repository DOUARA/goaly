import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faSortNumericUp
} from "@fortawesome/free-solid-svg-icons";

// Component Style
const useStyles = makeStyles((theme, props) => ({
  root: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.gray.light}`,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap"
    }
  },
  colorBar: {
    background: props => props.color,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      marginLeft: 0,

      width: "100%",
      height: 5
    }
  },
  category: {
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
  categoryName: {
    flexGrow: 1
  },
  categoryOptions: {
    opacity: 0,
    [theme.breakpoints.down("sm")]: {
      opacity: 1
    }
  },
  categoryOptionIcon: {
    padding: theme.spacing(2),
    "& svg": {
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7
      }
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
  goalsNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3, 6),
    background: "#FFF5EB",
    fontSize: 14,
    color: theme.palette.primary.main,
    "& svg": {
      paddingLeft: theme.spacing(3)
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));

const Category = props => {
  // Component ClassNames
  const classes = useStyles(props);

  // Show goals number
  let goalsNumber = `${props.goalsNumber} Goals`;
  switch (props.goalsNumber) {
    case 0:
      goalsNumber = "No Goals";
      break;
    case 1:
      goalsNumber = `${props.goalsNumber} Goal`;
      break;

    default:
      goalsNumber = `${props.goalsNumber} Goals`;
      break;
  }

  return (
    <div className={classes.root}>
      <div className={classes.colorBar}></div>
      <div className={classes.category}>
        <div className={classes.categoryName}>{props.name}</div>
        <div className={classes.categoryOptions}>
          <span className={classes.categoryOptionIcon}>
            <FontAwesomeIcon
              icon={faPencilAlt}
              className={classes.pencilIcon}
            ></FontAwesomeIcon>
          </span>
          <span className={classes.categoryOptionIcon}>
            <FontAwesomeIcon
              icon={faTrash}
              className={classes.trashIcon}
            ></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className={classes.goalsNumber}>
        {goalsNumber}
        <FontAwesomeIcon icon={faSortNumericUp}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Category;
