import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faCheck,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "components/templates/confirm-modal";
import { useHistory } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { removeAlerts } from "store/actions/alert";
import { deleteGoal, getGoals, completeGoal } from "store/actions/goals";
import { SetEditGoal } from "store/actions/set-edit-goal";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    background: props =>
      props.completed ? theme.palette.gray.lightest : "#ffffff",
    border: `1px solid ${theme.palette.gray.light}`,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap"
    }
  },
  colorBar: {
    background: props => props.color,
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

const Goal = props => {
  // Component States
  const [removeModal, setRemoveModal] = useState(false);
  const [finishedGoalModal, setFinishedGoalModal] = useState(false);

  // history object
  const history = useHistory();

  // Component ClassNames
  const classes = useStyles(props);

  // props destructuring
  const {
    name,
    deadline,
    catid,
    id,
    completed,
    deleteGoal,
    getGoals,
    removeAlerts,
    SetEditGoal,
    completeGoal
  } = props;

  // On edit function
  const onEdit = event => {
    event.preventDefault();
    SetEditGoal({
      name,
      catid,
      deadline,
      id
    });
    history.push("/dashboard/edit_goal");
  };

  return (
    <div className={classes.root}>
      {removeModal ? (
        <ConfirmModal
          descriptionL1='Are you sure you want to delete this goal?'
          onClose={() => setRemoveModal(false)}
          onConfirm={() => {
            removeAlerts();
            deleteGoal(id);
            getGoals();
          }}
        />
      ) : null}
      {finishedGoalModal ? (
        <ConfirmModal
          descriptionL1='Congratulations on finihing the goal 🤩'
          descriptionL2='Note: This operation is irreversible'
          onClose={() => setFinishedGoalModal(false)}
          onConfirm={() => {
            removeAlerts();
            completeGoal(id);
            getGoals();
          }}
        />
      ) : null}
      <div className={classes.colorBar}></div>
      <div className={classes.goal}>
        <div className={classes.goalName}>{name}</div>
        <div className={classes.goalOptions}>
          {!props.completed ? (
            <span className={classes.goalOptionIcon}>
              <FontAwesomeIcon
                onClick={() => setFinishedGoalModal(true)}
                icon={faCheck}
                className={classes.checkIcon}
              ></FontAwesomeIcon>
            </span>
          ) : null}
          {!props.completed ? (
            <span className={classes.goalOptionIcon}>
              <FontAwesomeIcon
                onClick={onEdit}
                icon={faPencilAlt}
                className={classes.pencilIcon}
              ></FontAwesomeIcon>
            </span>
          ) : null}
          <span className={classes.goalOptionIcon}>
            <FontAwesomeIcon
              onClick={() => setRemoveModal(!removeModal)}
              icon={faTrash}
              className={classes.trashIcon}
            ></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className={classes.deadLine}>
        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
        {deadline}
      </div>
    </div>
  );
};

export default connect(null, {
  deleteGoal,
  getGoals,
  removeAlerts,
  SetEditGoal,
  completeGoal
})(Goal);
