import { SET_EDIT_GOAL } from "./types";

// Set Edit Category
export const SetEditGoal = goalObject => async dispatch => {
  dispatch({
    type: SET_EDIT_GOAL,
    payload: goalObject
  });
};
