import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  ACCOUNT_ACTIVATE_SUCCESS,
  ACCOUNT_ACTIVATE_FAILED,
  AUTH_SUCCESS,
  AUTH_FAILED,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SEND_RESET_EMAIL_SUCCESS,
  SEND_RESET_EMAIL_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  USER_LOGOUT
} from "./types";
import { setAlert, removeAlerts } from "./alert";
import axios from "axios";
import setAuthToken from "utils/set-auth-token";
import alertErrors from "utils/alert-errors";
import { getProfile } from "./profile";

// Authentication
export const auth = () => async dispatch => {
  if (localStorage.token) {
    await setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    await dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });

    await dispatch(getProfile());
  } catch (error) {
    localStorage.removeItem("token");
    dispatch({
      type: AUTH_FAILED
    });
  }
};

// Registration
export const register = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/api/users", body, config);
    // Set Success Alert
    dispatch(setAlert(res.data.msg, "success"));

    // Register Success Action
    dispatch({
      type: REGISTER_SUCCESS
    });
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({
      type: REGISTER_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// Login
export const login = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/api/auth/login", body, config);

    // Set Success Alert
    dispatch(setAlert("Login Success", "success"));

    // Store the token on the local storage
    localStorage.setItem("token", res.data.token);

    // Get Authenticated
    await dispatch(auth());

    // Login Success Action
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    });
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({
      type: LOGIN_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// Google Authentication
export const google_auth = tokenId => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ tokenId });

  try {
    const res = await axios.post("/api/auth/google", body, config);

    // Remove Alerts
    await dispatch(removeAlerts());

    // Set Success Alert
    await dispatch(setAlert("Login Success", "success"));

    // Store the token on the local storage
    localStorage.setItem("token", res.data.token);

    // Login Success Action
    await dispatch({
      type: GOOGLE_AUTH_SUCCESS,
      payload: res.data.token
    });

    // Get Authenticated
    dispatch(auth());
  } catch (err) {
    dispatch({
      type: GOOGLE_AUTH_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// Activate Email
export const activateEmail = token => async dispatch => {
  try {
    const res = await axios.get(`/api/users/verify/${token}`);
    dispatch({
      type: ACCOUNT_ACTIVATE_SUCCESS
    });
    dispatch(setAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: ACCOUNT_ACTIVATE_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// Forgot Password
export const sendResetEmail = email => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email });
    const res = await axios.post("/api/users/forgot_password", body, config);

    await dispatch({
      type: SEND_RESET_EMAIL_SUCCESS
    });
    await dispatch(removeAlerts());
    await dispatch(setAlert(res.data.msg));
  } catch (err) {
    dispatch({
      type: SEND_RESET_EMAIL_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// Reset Password
export const resetPassword = (token, password) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ token, password });
    const result = await axios.post("/api/users/reset_password", body, config);

    await dispatch(removeAlerts());
    await dispatch(setAlert(result.data.msg));

    await dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAILED
    });
    alertErrors(err, dispatch);
  }
};

// LOGOUT
export const logout = () => async dispatch => {
  localStorage.removeItem("token");
  await dispatch({
    type: USER_LOGOUT
  });
};
