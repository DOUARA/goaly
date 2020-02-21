import { SET_EDIT_CATEGORY } from "store/actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_EDIT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
