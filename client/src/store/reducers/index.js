import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import cats from "./cats";
import recent_cat from "./recent_cat";

export default combineReducers({
  alerts,
  auth,
  cats,
  recent_cat
});
