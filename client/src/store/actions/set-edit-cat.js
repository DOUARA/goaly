import { SET_EDIT_CATEGORY } from "./types";

// Set Edit Category
export const SetEditCategory = catObject => async dispatch => {
  dispatch({
    type: SET_EDIT_CATEGORY,
    payload: catObject
  });
};
