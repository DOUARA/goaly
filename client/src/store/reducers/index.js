import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import profile from "./profile";
import cats from "./cats";
import editCat from "./set-edit-cat";
import goals from "./goals";
import editGoal from "./set-edit-goal";
import { USER_LOGOUT } from "../actions/types";

const combinedReducer = combineReducers({
  alerts,
  auth,
  profile,
  cats,
  editCat,
  goals,
  editGoal
});

const initialState = combinedReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return initialState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
