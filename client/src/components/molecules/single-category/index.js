import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faSortNumericUp
} from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "components/templates/confirm-modal";
import { useHistory } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { removeAlerts } from "store/actions/alert";
import { deleteCategory, getCategories } from "store/actions/cats";
import { SetEditCategory } from "store/actions/set-edit-cat";

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
    flexGrow: 1,
    textTransform: "capitalize"
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
    "min-width": "150px",
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
  // Component States
  const [removeModal, setRemoveModal] = useState(false);

  // history object
  const history = useHistory();

  // Component ClassNames
  const classes = useStyles(props);

  // props destructuring
  const {
    goalsNumber,
    SetEditCategory,
    name,
    color,
    id,
    removeAlerts,
    getCategories,
    deleteCategory
  } = props;

  // Show goals number
  let goalsNumberExpresion = `${goalsNumber} Goals`;
  switch (goalsNumber) {
    case 0:
      goalsNumberExpresion = "No Goals";
      break;
    case 1:
      goalsNumberExpresion = `${goalsNumber} Goal`;
      break;

    default:
      goalsNumberExpresion = `${goalsNumber} Goals`;
      break;
  }

  // On edit function
  const onEdit = event => {
    event.preventDefault();
    SetEditCategory({
      name,
      color,
      id
    });
    history.push("/dashboard/edit_category");
  };

  return (
    <div className={classes.root}>
      {removeModal ? (
        <ConfirmModal
          descriptionL1='Are you sure you want to delete this item?'
          descriptionL2='All goals of this Category will be deleted'
          onClose={() => setRemoveModal(false)}
          onConfirm={() => {
            removeAlerts();
            deleteCategory(id);
            getCategories();
          }}
        />
      ) : null}

      <div className={classes.colorBar}></div>
      <div className={classes.category}>
        <div className={classes.categoryName}>{name}</div>
        <div className={classes.categoryOptions}>
          <span className={classes.categoryOptionIcon}>
            <FontAwesomeIcon
              onClick={onEdit}
              icon={faPencilAlt}
              className={classes.pencilIcon}
            ></FontAwesomeIcon>
          </span>
          <span className={classes.categoryOptionIcon}>
            <FontAwesomeIcon
              onClick={() => setRemoveModal(!removeModal)}
              icon={faTrash}
              className={classes.trashIcon}
            ></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className={classes.goalsNumber}>
        {goalsNumberExpresion}
        <FontAwesomeIcon icon={faSortNumericUp}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default connect(null, {
  deleteCategory,
  getCategories,
  SetEditCategory,
  removeAlerts
})(Category);
