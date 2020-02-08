import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILED } from "store/actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
