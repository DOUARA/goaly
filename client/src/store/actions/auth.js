import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOGOUT
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "utils/set-auth-token";

// Authentication
export const auth = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
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
    dispatch(setAlert("Register Success", "success"));

    // Store the token on the local storage
    localStorage.setItem("token", res.data.token);

    // Register Success Action
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token
    });

    // Get Authenticated
    dispatch(auth());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (Array.isArray(errors)) {
        errors.map(error => {
          console.log(error.msg);
          dispatch(setAlert(error.msg, "error"));
        });
      }
    }

    localStorage.removeItem("token");
    dispatch({
      type: REGISTER_FAILED
    });
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

    // Login Success Action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    });

    // Get Authenticated
    dispatch(auth());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (Array.isArray(errors)) {
        errors.map(error => {
          dispatch(setAlert(error.msg, "error"));
        });
      }
    }

    localStorage.removeItem("token");
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

// LOGOUT
export const logout = () => ({
  type: USER_LOGOUT
});
