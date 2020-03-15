import React, { Fragment, useEffect } from "react";
import Home from "components/pages/home";
import Login from "components/organisms/login";
import SignUp from "components/organisms/signup";
import ForgotPassword from "components/organisms/forgot-password";
import ResetPassword from "components/organisms/reset-password";
import Dashboard from "components/pages/dashboard";
import { Route, Switch, useLocation } from "react-router-dom";
import { removeAlerts } from "store/actions/alert";
import PrivateRoute from "components/utils/private-route";

// Redux
import { connect } from "react-redux";

const Routes = ({ removeAlerts }) => {
  let location = useLocation();
  useEffect(() => {
    removeAlerts();
  }, [removeAlerts, location]);
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route
        exact
        path='/login'
        render={props => (
          <Fragment>
            <Home />
            <Login {...props} />
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
      <Route
        exact
        path='/verify/:token'
        render={props => (
          <Fragment>
            <Home />
            <Login {...props} />
          </Fragment>
        )}
      />
      <Route
        exact
        path='/password_reset/:token'
        render={props => (
          <Fragment>
            <Home />
            <ResetPassword {...props} />
          </Fragment>
        )}
      />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  );
};

export default connect(null, { removeAlerts })(Routes);
