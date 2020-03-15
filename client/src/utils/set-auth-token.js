import axios from "axios";

export default token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log("There's a token!");
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    console.log("There's no localstorage token");
  }
};
