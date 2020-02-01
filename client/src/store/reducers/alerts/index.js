import { ADD_ALERT, REMOVE_ALERTS } from "../../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERTS:
      return [];
    default:
      return state;
  }
};
