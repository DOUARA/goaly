import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOGOUT
} from "store/actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAILED:
    case AUTH_FAILED:
    case LOGIN_FAILED:
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true
      };
    default:
      return state;
  }
};
