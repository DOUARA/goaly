import { GET_GOALS_SUCCESS } from "store/actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_GOALS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
