import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAILED,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  UPDATE_EMAIL_PASS_SUCCESS,
  UPDATE_EMAIL_PASS_FAILED
} from "./types";
import { setAlert, removeAlerts } from "store/actions/alert";
import alertErrors from "utils/alert-errors";
import axios from "axios";

// Get Profile info
export const getProfile = () => async dispatch => {
  try {
    const result = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PROFILE_FAILED
    });
  }
};

// Update full name
export const updateName = name => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name });
    const result = await axios.post("/api/profile/name", body, config);

    // Dispatch success
    await dispatch({ type: UPDATE_NAME_SUCCESS });
    // Set success alert
    await dispatch(removeAlerts());
    await dispatch(setAlert(result.data.msg));
    await dispatch(getProfile());
    setTimeout(() => {
      dispatch(removeAlerts());
    }, 2500);
  } catch (err) {
    // Dispatch failure
    dispatch({ type: UPDATE_NAME_FAILED });
    alertErrors(err, dispatch);
  }
};

// Update role
export const updateRole = role => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ role });
    const result = await axios.post("/api/profile/role", body, config);

    // Dispatch success
    await dispatch({ type: UPDATE_ROLE_SUCCESS });
    // Set success alert
    await dispatch(removeAlerts());
    await dispatch(setAlert(result.data.msg));
    await dispatch(getProfile());
    setTimeout(() => {
      dispatch(removeAlerts());
    }, 2500);
  } catch (err) {
    // Dispatch failure
    dispatch({ type: UPDATE_ROLE_FAILED });
    alertErrors(err, dispatch);
  }
};

// Update Email and password
export const emailPassUpdate = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/profile/update", body, config);

    await dispatch({ type: UPDATE_EMAIL_PASS_SUCCESS });
    await dispatch(removeAlerts());
    await dispatch(setAlert(res.data.msg));
  } catch (err) {
    dispatch({ type: UPDATE_EMAIL_PASS_FAILED });
    alertErrors(err, dispatch);
  }
};
