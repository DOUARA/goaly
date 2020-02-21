import React, { useState, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import ColorPicker from "../../components/color-picker";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Alert from "components/alert";

// Redux
import { connect } from "react-redux";
import { addCategory, editCategory, getCategories } from "store/actions/cats";
import { removeAlerts } from "store/actions/alert";

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

const NewCategory = ({
  addCategory,
  editCategory,
  removeAlerts,
  editCatObject,
  edit
}) => {
  // State
  const [newName, setNewName] = useState(edit ? editCatObject.name : "");
  const [newColor, setNewColor] = useState(
    edit ? editCatObject.color : "#4A90E2"
  );

  // Component ClassNames
  const classes = useStyles();

  // On Submit form
  const onSubmit = event => {
    event.preventDefault();
    removeAlerts();
    if (edit) {
      return editCategory(newName, newColor, editCatObject.id);
    }
    return addCategory(newName, newColor);
  };

  return (
    <Fragment>
      <Typography variant='h2' component='h2'>
        {edit ? "Edit a Category" : "Add a New Category"}
      </Typography>
      <form className={classes.root} onSubmit={onSubmit}>
        <Alert></Alert>
        <FormControl>
          <FormLabel>
            <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>Category Name
          </FormLabel>
          <TextField
            variant='outlined'
            name='category'
            value={newName}
            onChange={event => setNewName(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <FontAwesomeIcon icon={faTint}></FontAwesomeIcon>Color
          </FormLabel>
          <ColorPicker
            color={newColor}
            onChange={color => setNewColor(color.hex)}
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
    </Fragment>
  );
};

NewCategory.defaultProps = {
  edit: false
};

const mapStateToProps = state => ({
  editCatObject: state.editCat
});

export default connect(mapStateToProps, {
  addCategory,
  removeAlerts,
  editCategory
})(NewCategory);
