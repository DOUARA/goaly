import React, { useEffect } from "react";
import SideBar from "components/organisms/sidebar";
import TopBar from "components/organisms/topbar";
import Container from "@material-ui/core/container";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "components/organisms/profile";
import Goals from "components/organisms/goals-list";
import GoalForm from "components/organisms/goal-form";
import CategoryForm from "components/organisms/category-form";
import Categories from "components/organisms/categories-list";
import PrivateRoute from "components/utils/private-route";
// Redux
import { connect } from "react-redux";
import { getProfile } from "store/actions/profile";

// Component Style
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(10, 7),
    maxWidth: "960px",
    margin: "auto"
  }
}));

const Dashboard = ({ getProfile }) => {
  // Component ClassNames
  const classes = useStyles();

  // Get profile
  useEffect(() => {
    getProfile();
  });

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      <div style={{ width: "100%" }}>
        <TopBar />
        <Container className={classes.container}>
          <PrivateRoute path='/dashboard/profile' component={Profile} />
          <PrivateRoute exact path='/dashboard/goals' component={Goals} />
          <PrivateRoute exact path='/dashboard/new_goal' component={GoalForm} />
          <PrivateRoute
            exact
            path='/dashboard/edit_goal'
            component={() => <GoalForm edit={true} />}
          />
          <PrivateRoute
            exact
            path='/dashboard/new_category'
            component={CategoryForm}
          />
          <PrivateRoute
            exact
            path='/dashboard/edit_category'
            component={() => <CategoryForm edit={true} />}
          />
          <PrivateRoute
            exact
            path='/dashboard/categories'
            component={Categories}
          />
        </Container>
      </div>
    </div>
  );
};

export default connect(null, { getProfile })(Dashboard);
