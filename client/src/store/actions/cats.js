import {
  GET_CATEGORIES,
  REMOVE_CATEGORIES,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED
} from "./types";
import { setAlert, removeAlerts } from "store/actions/alert";
import alertErrors from "utils/alert-errors";
import axios from "axios";

// Get the List of categories
export const getCategories = () => async dispatch => {
  try {
    const req = await axios.get("/api/categories");
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
    await axios.post("/api/categories/new", body, config);

    // Dispatch success
    await dispatch({ type: ADD_CATEGORY_SUCCESS });

    // Set success alert
    await dispatch(removeAlerts());
    await dispatch(
      setAlert("Category has been Added Successfully!", "success")
    );
  } catch (err) {
    // Dispatch failure
    dispatch({ type: ADD_CATEGORY_FAILED });
    alertErrors(err, dispatch);
  }
};

// Delete a category
export const deleteCategory = catId => async dispatch => {
  try {
    await axios.delete(`/api/categories/delete/${catId}`);
    dispatch({
      type: REMOVE_CATEGORY_SUCCESS
    });
    dispatch(setAlert("Category has been Removed successfully!"));
  } catch (error) {
    dispatch({
      type: REMOVE_CATEGORY_FAILED
    });
  }
};

// Edit a category
export const editCategory = (name, color, catId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, color });

    await axios.post(`/api/categories/edit/${catId}`, body, config);

    dispatch({
      type: EDIT_CATEGORY_SUCCESS
    });
    dispatch(setAlert("Category has been updated Successfully!"));
  } catch (err) {
    dispatch({
      type: EDIT_CATEGORY_FAILED
    });
    alertErrors(err, dispatch);
  }
};
