import React from "react";
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

const NewGoal = () => {
  // Component States
  const [category, setCategory] = React.useState("");

  // Component ClassNames
  const classes = useStyles();

  // Handle Events
  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Typography variant='h2' component='h2'>
        Add a New Goal
      </Typography>
      <form className={classes.root}>
        <FormControl className={classes.formControl}>
          <FormLabel>
            <FontAwesomeIcon icon={faBullseye}></FontAwesomeIcon>Goal Name
          </FormLabel>
          <TextField variant='outlined' className={classes.goalNameInput} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel>
            <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>
            Category
          </FormLabel>
          <NativeSelect
            variant='outlined'
            value={category}
            onChange={handleChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
            className={classes.dateInput}
          />
        </FormControl>
        <Button size='large' variant='contained' className={classes.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewGoal;
