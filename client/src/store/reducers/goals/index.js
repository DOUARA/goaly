import { GET_GOALS } from "store/actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_GOALS:
      return action.payload;
    default:
      return state;
  }
};
