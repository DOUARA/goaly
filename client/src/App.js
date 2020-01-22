import React, { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./global.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Home from "./views/home/";
import Login from "./views/home/modals/login";
import SignUp from "./views/home/modals/signup";
import ForgotPassword from "./views/home/modals/forgot-password";
import Dashboard from "./views/dashboard";
import { Route, HashRouter } from "react-router-dom";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <Route exact path='/' component={Home} />
      <Route
        exact
        path='/login'
        render={() => (
          <Fragment>
            <Home />
            <Login />
          </Fragment>
        )}
      />
      <Route
        exact
        path='/sign_up'
        render={() => (
          <Fragment>
            <Home />
            <SignUp />
          </Fragment>
        )}
      />
      <Route
        exact
        path='/forgot_password'
        render={() => (
          <Fragment>
            <Home />
            <ForgotPassword />
          </Fragment>
        )}
      />
      <Route path='/dashboard' component={Dashboard} />
    </HashRouter>
  </ThemeProvider>
);

export default App;
