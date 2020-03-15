import {
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILED,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_FAILED,
  REMOVE_GOAL_SUCCESS,
  REMOVE_GOAL_FAILED,
  EDIT_GOAL_SUCCESS,
  EDIT_GOAL_FAILED,
  COMPLETE_GOAL_SUCCESS,
  COMPLETE_GOAL_FAILED
} from "./types";
import { setAlert, removeAlerts } from "store/actions/alert";
import alertErrors from "utils/alert-errors";
import axios from "axios";

// Get the List of Goals
export const getGoals = () => async dispatch => {
  try {
    const req = await axios.get("/api/goals");
    return dispatch({
      type: GET_GOALS_SUCCESS,
      payload: req.data
    });
  } catch (error) {
    return dispatch({
      type: GET_GOALS_FAILED
    });
  }
};

// Add a new Goal
export const addGoal = (name, category_id, deadline) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, category_id, deadline });
    await axios.post("/api/goals/new", body, config);

    // Dispatch success
    await dispatch({ type: ADD_GOAL_SUCCESS });

    // Set success alert
    await dispatch(removeAlerts());
    await dispatch(setAlert("Goal has been Added Successfully!", "success"));
  } catch (err) {
    // Dispatch failure
    dispatch({ type: ADD_GOAL_FAILED });
    alertErrors(err, dispatch);
  }
};

// Remove a Goal
export const deleteGoal = goalId => async dispatch => {
  try {
    await axios.delete(`/api/goals/delete/${goalId}`);
    dispatch({
      type: REMOVE_GOAL_SUCCESS
    });
    dispatch(setAlert("the Goal has been Removed successfully!"));
  } catch (error) {
    dispatch({
      type: REMOVE_GOAL_FAILED
    });
  }
};

// Complete a Goal
export const completeGoal = goalId => async dispatch => {
  try {
    const res = await axios.patch(`/api/goals/complete/${goalId}`);
    dispatch({
      type: COMPLETE_GOAL_SUCCESS
    });
    dispatch(setAlert(res.data.msg));
  } catch (error) {
    dispatch({
      type: COMPLETE_GOAL_FAILED
    });
  }
};

// Edit a Goal
export const editGoal = (name, id, category_id, deadline) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, category_id, deadline });

    await axios.post(`/api/goals/edit/${id}`, body, config);

    dispatch({
      type: EDIT_GOAL_SUCCESS
    });
    dispatch(setAlert("The Goal has been updated Successfully!"));
  } catch (err) {
    dispatch({
      type: EDIT_GOAL_FAILED
    });
    alertErrors(err, dispatch);
  }
};
