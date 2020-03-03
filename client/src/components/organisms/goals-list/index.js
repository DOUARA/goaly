import React, { Fragment, useEffect, useState } from "react";
import Header from "components/molecules/goals-header";
import Filters from "components/molecules/goals-filters";
import Goal from "components/molecules/single-goal";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "components/molecules/pagination";

// Redux
import { connect } from "react-redux";
import { getGoals } from "store/actions/goals";
import Alert from "components/molecules/alert";

// Component Styles
const useStyles = makeStyles(theme => ({
  goals: {
    margin: theme.spacing(5, 0)
  }
}));

const List = ({ goals, getGoals }) => {
  // Component State
  const [offset, setOffset] = useState(0);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  // Component Classes
  const classes = useStyles();
  useEffect(() => {
    getGoals();
  }, []);
  // Number of goals to display per page
  const limit = 5;

  let goalsList = goals;

  // Category Filtering
  if (category != "all") {
    goalsList = goalsList.filter(goal => goal.category_id == category);
  }

  // Status Filtering
  if (status != "all") {
    if (status == "completed") {
      goalsList = goalsList.filter(goal => goal.completed == true);
    }

    if (status == "uncompleted") {
      goalsList = goalsList.filter(goal => goal.completed == false);
    }
  }

  // total number of goals to display
  const total = goalsList.length;

  goalsList = goalsList.slice(offset, offset + limit);

  let goalsItems = goalsList.map(goal => (
    <Goal
      name={goal.name}
      color={goal.color}
      deadline={goal.deadline}
      id={goal._id}
      catid={goal.category_id}
      completed={goal.completed}
    />
  ));

  return (
    <Fragment>
      <Header></Header>
      <Alert />
      <Filters
        onChangeCat={cat => {
          setCategory(cat);
          setOffset(0);
        }}
        onChangeStatus={status => {
          setStatus(status);
          setOffset(0);
        }}
      ></Filters>
      <div className={classes.goals}>{goalsItems}</div>
      {total > limit ? (
        <Pagination
          offset={offset}
          limit={limit}
          total={total}
          onClick={(e, offset) => {
            setOffset(offset);
          }}
        />
      ) : null}
      {total == 0 ? "No goals found" : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  goals: state.goals
});

export default connect(mapStateToProps, { getGoals })(List);
