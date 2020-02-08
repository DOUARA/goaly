import {
  GET_CATEGORIES,
  REMOVE_CATEGORIES,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED
} from "./types";
import { setAlert } from "store/actions/alert";
import axios from "axios";

// Get the List of categories
export const getCategories = () => async dispatch => {
  try {
    const req = await axios.get("api/categories");
    console.log(req);
    return dispatch({
      type: GET_CATEGORIES,
      payload: req.data
    });
  } catch (error) {
    return dispatch({
      type: REMOVE_CATEGORIES
    });
  }
};

// Add a new category
export const addCategory = (name, color) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, color });
    const req = await axios.post("api/categories/new", body, config);

    // Dispatch success
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: req.data });

    // Set success alert
    dispatch(setAlert("Category Added Successfully!", "success"));
  } catch (err) {
    // Dispatch failure
    dispatch({ type: ADD_CATEGORY_FAILED });
    if (err.response) {
      const errors = err.response.data.errors;
      if (Array.isArray(errors)) {
        errors.map(error => {
          dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  }
};
