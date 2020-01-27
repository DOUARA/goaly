import React, { Fragment } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

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

const Filters = () => {
  // Component States
  const [state, setState] = React.useState({
    category: "all",
    status: "all"
  });

  // Component ClassNames
  const classes = useStyles();

  // Handle Events
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
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
          inputProps={{
            name: "category"
          }}
        >
          <option value='' />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
          native
          labelWidth={45}
          value={state.status}
          onChange={handleChange("status")}
          name='category'
        >
          <option value='' />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default Filters;
