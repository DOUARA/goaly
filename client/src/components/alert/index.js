import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

const CustomAlert = props => {
  const alerts = props.alerts;
  if (Array.isArray(alerts)) {
    return alerts.map(alert => (
      <Alert severity={alert.alertType}>{alert.msg}</Alert>
    ));
  }
  return null;
};

const mapStateToProps = state => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(CustomAlert);
