import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 10),
    textAlign: "center",
    outline: 0
  },
  button: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 4),
    "&:hover": {
      background: "#ffffff",
      textDecoration: "underline"
    }
  }
}));

const ConfirmModal = props => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      {...props}
    >
      <Fade in={true}>
        <div className={classes.paper}>
          <p id='transition-modal-description'>{props.descriptionL1}</p>
          <p
            id='transition-modal-description'
            style={{ fontStyle: "italic", fontSize: "13px" }}
          >
            {props.descriptionL2}
          </p>
          <Button
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
            className={classes.button}
            color='secondary'
          >
            Confirm
          </Button>
          <Button
            onClick={props.onClose}
            className={classes.button}
            color='primary'
          >
            Cancel
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

// Default props and proptypes
ConfirmModal.defaultProps = {
  onClose: () => {
    return "";
  },
  onConfirm: () => {
    return "";
  }
};

ConfirmModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

export default ConfirmModal;
