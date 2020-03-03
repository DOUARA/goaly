import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./global.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Home from "components/pages/home";
import Login from "components/organisms/login";
import SignUp from "components/organisms/signup";
import ForgotPassword from "components/organisms/forgot-password";
import Dashboard from "components/pages/dashboard";
import { Route, HashRouter } from "react-router-dom";
import { removeAlerts } from "store/actions/alert";
import PrivateRoute from "components/utils/private-route";
// Redux
import { Provider } from "react-redux";
import store from "store";
import { auth } from "store/actions/auth";
import createHistory from "history/createBrowserHistory";

// Remove alerts on route change
const history = createHistory();
history.listen(() => {
  store.dispatch(removeAlerts());
});

const App = () => {
  useEffect(() => {
    store.dispatch(auth());
  }, []);
  return (
    <Provider store={store}>
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
          <PrivateRoute path='/dashboard' component={Dashboard} />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
