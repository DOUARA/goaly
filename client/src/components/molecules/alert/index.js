import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Fade from "@material-ui/core/Fade";

// Component Style
const useStyles = makeStyles(theme => ({
  alert: {
    margin: theme.spacing(0, 0, 5, 0),
    fontSize: 14
  }
}));

const CustomAlert = props => {
  const classes = useStyles();
  const { alerts } = props;
  if (Array.isArray(alerts)) {
    return alerts.map(alert => (
      <Fade in={true}>
        <Alert className={classes.alert} severity={alert.alertType} {...props}>
          {alert.msg}
        </Alert>
      </Fade>
    ));
  }
  return null;
};

const mapStateToProps = state => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(CustomAlert);
