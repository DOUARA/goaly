import { setAlert } from "store/actions/alert";

const alertErrors = (err, dispatch) => {
  if (err.response) {
    const errors = err.response.data.errors;
    if (Array.isArray(errors)) {
      errors.map(error => {
        return dispatch(setAlert(error.msg, "error"));
      });
    }
  }
};

export default alertErrors;
