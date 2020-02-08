import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import cats from "./cats";

export default combineReducers({
  alerts,
  auth,
  cats
});
