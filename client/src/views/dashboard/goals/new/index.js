import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faLayerGroup,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import Alert from "components/alert";
// Redux
import { connect } from "react-redux";
import { getCategories } from "store/actions/cats";
import { removeAlerts } from "store/actions/alert";
import { addGoal, editGoal } from "store/actions/goals";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    width: "450px",
    maxWidth: "100%",
    marginTop: theme.spacing(12),
    "& .MuiFormControl-root": {
      display: "block",
      marginBottom: theme.spacing(8)
    },
    "& .MuiInputBase-root": {
      display: "block",
      "& .MuiSelect-root": {
        boxSizing: "border-box"
      },
      "& input": {
        boxSizing: "border-box !important",
        padding: theme.spacing(6, 4)
      }
    },
    "& label": {
      display: "block",
      margin: theme.spacing(2, 0),
      color: theme.palette.gray.dark,
      "& svg": {
        paddingRight: theme.spacing(2)
      }
    }
  },
  submit: {
    background: theme.palette.success.main,
    color: "#fff",
    borderRadius: "4px",
    "&:hover": {
      background: theme.palette.success.dark
    }
  },
  dateInput: {
    maxWidth: "265px"
  }
}));

const NewGoal = ({
  getCategories,
  categories,
  addGoal,
  removeAlerts,
  editGoalObject,
  editGoal,
  edit
}) => {
  // Component States
  const [category, setCategory] = React.useState(
    edit ? editGoalObject.catid : ""
  );
  const [goalName, setGoalName] = React.useState(
    edit ? editGoalObject.name : ""
  );
  const [deadline, setDeadline] = React.useState(
    edit ? editGoalObject.deadline : ""
  );

  // load categories
  useEffect(() => {
    getCategories();
  }, []);

  // categories' items
  const catsItems = categories.map(category => (
    <MenuItem value={category._id}>{category.name}</MenuItem>
  ));

  // Component ClassNames
  const classes = useStyles();

  // On Submit form
  const onSubmit = event => {
    event.preventDefault();
    removeAlerts();
    if (edit) {
      return editGoal(goalName, editGoalObject.id, category, deadline);
    }
    return addGoal(goalName, category, deadline);
  };

  return (
    <div>
      <Typography variant='h2' component='h2'>
        {edit ? "Edit a Goal" : "Add a New Goal"}
      </Typography>
      <form className={classes.root} onSubmit={onSubmit}>
        <Alert></Alert>
        <FormControl className={classes.formControl}>
          <FormLabel>
            <FontAwesomeIcon icon={faBullseye}></FontAwesomeIcon>Goal Name
          </FormLabel>
          <TextField
            variant='outlined'
            className={classes.goalNameInput}
            value={goalName}
            onChange={event => setGoalName(event.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel>
            <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>
            Category
          </FormLabel>
          <NativeSelect
            variant='outlined'
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {catsItems}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>Expected
            Deadline
          </FormLabel>
          <TextField
            type='date'
            variant='outlined'
            value={deadline}
            onChange={event => setDeadline(event.target.value)}
            className={classes.dateInput}
          />
        </FormControl>
        <Button
          type='submit'
          size='large'
          variant='contained'
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  categories: state.cats,
  editGoalObject: state.editGoal
});
export default connect(mapStateToProps, {
  getCategories,
  addGoal,
  removeAlerts,
  editGoal
})(NewGoal);
