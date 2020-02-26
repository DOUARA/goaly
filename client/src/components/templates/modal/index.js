import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Component Style
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
    "& form": {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      width: 350,
      maxWidth: "100%",
      margin: "auto"
    }
  },
  wrraper: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: theme.shadows[5],
    borderRadius: 12,
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    maxWidth: "85vw",
    maxHeight: "85vh",
    width: props => `${props.width}px`,
    position: "relative"
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(4),
    right: theme.spacing(4),
    color: theme.palette.gray.main,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.gray.dark
    }
  },
  modelTitle: {
    padding: 0,
    color: theme.palette.primary.main
  }
}));

const CustomModal = props => {
  // Component States
  const [open, setOpen] = React.useState(true);

  // Component ClassNames
  const classes = useStyles(props);

  // Close Route
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.wrraper}>
          <FontAwesomeIcon
            onClick={handleClose}
            icon={faTimes}
            className={classes.closeIcon}
          />
          {props.title ? (
            <h2 className={classes.modelTitle} id='transition-modal-title'>
              {props.title}
            </h2>
          ) : null}
          {props.children}
        </div>
      </Fade>
    </Modal>
  );
};

// Default props and proptypes
CustomModal.defaultProps = {
  title: "",
  width: "450",
  closeIcon: true
};

CustomModal.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  closeIcon: PropTypes.bool
};

export default CustomModal;
