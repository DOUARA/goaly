import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
// Component Style
const useStyles = makeStyles(theme => ({
  alert: {
    margin: theme.spacing(0, 0, 5, 0),
    fontSize: 14
  }
}));

const CustomAlert = ({ alerts }) => {
  const classes = useStyles();
  if (Array.isArray(alerts)) {
    return alerts.map(alert => (
      <Alert className={classes.alert} severity={alert.alertType}>
        {alert.msg}
      </Alert>
    ));
  }
  return null;
};

const mapStateToProps = state => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(CustomAlert);
