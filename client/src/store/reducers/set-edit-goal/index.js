import { SET_EDIT_GOAL } from "store/actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_EDIT_GOAL:
      return action.payload;
    default:
      return state;
  }
};
