import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import cats from "./cats";
import editCat from "./set-edit-cat";
import goals from "./goals";
import editGoal from "./set-edit-goal";

export default combineReducers({
  alerts,
  auth,
  cats,
  editCat,
  goals,
  editGoal
});
