import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./global.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
// Redux
import { Provider } from "react-redux";
import store from "store";
import { auth } from "store/actions/auth";

// Try to authenticate
store.dispatch(auth());

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
