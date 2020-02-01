import { ADD_ALERT, REMOVE_ALERTS } from "./types";
import uuid from "uuid";

export const setAlert = (msg, alertType) => dispatch => {
  const alert_id = uuid.v4();
  return dispatch({
    type: ADD_ALERT,
    payload: { id: alert_id, msg, alertType }
  });
};

export const removeAlerts = () => dispatch => {
  return dispatch({
    type: REMOVE_ALERTS
  });
};
