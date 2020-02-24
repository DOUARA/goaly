import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILED } from "store/actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return action.payload;
    case GET_PROFILE_FAILED:
      return {};
    default:
      return state;
  }
};
