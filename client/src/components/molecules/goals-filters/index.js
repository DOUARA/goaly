import React, { Fragment, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// Redux
import { connect } from "react-redux";
import { getCategories } from "store/actions/cats";

// Component Styles
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    "& select": {
      padding: theme.spacing(3)
    },
    "& svg": {
      top: "calc(50% - 6px)"
    },
    "& .MuiInputLabel-formControl": {
      top: "-5px"
    }
  }
}));

const Filters = ({ cats, getCategories, onChangeCat, onChangeStatus }) => {
  // Component States
  const [state, setState] = React.useState({
    category: "all",
    status: "all"
  });

  useEffect(() => {
    getCategories();
  }, []);

  let catOptions = [];
  cats.map(cat => catOptions.push(<option value={cat._id}>{cat.name}</option>));
  // Component ClassNames
  const classes = useStyles();

  // Handle Events
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
    if (name === "category") {
      onChangeCat(event.target.value);
    }

    if (name === "status") {
      onChangeStatus(event.target.value);
    }
  };

  return (
    <Fragment>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Category</InputLabel>
        <Select
          native
          labelWidth={65}
          value={state.category}
          onChange={handleChange("category")}
          name='category'
          inputProps={{
            name: "category"
          }}
        >
          <option value='all'>All</option>
          {catOptions}
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
          native
          labelWidth={45}
          value={state.status}
          onChange={handleChange("status")}
          name='status'
        >
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='uncompleted'>Non-Completed</option>
        </Select>
      </FormControl>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  cats: state.cats
});

export default connect(mapStateToProps, { getCategories })(Filters);
