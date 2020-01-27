import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";

// Component Style
const useStyles = makeStyles(() => ({
  color: {
    width: "200px",
    height: "20px",
    borderRadius: "2px",
    background: state =>
      `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`
  },
  swatch: {
    padding: "10px",
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer"
  },
  popover: {
    position: "absolute",
    zIndex: "2"
  },
  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  }
}));

const ColorPicker = props => {
  // Component States
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  });
  // Component ClassNames
  const classes = useStyles(state);

  // Handle Diffrent Events
  const handleClick = () => {
    let newState = { ...state };
    newState.displayColorPicker = !state.displayColorPicker;
    setState(newState);
  };
  const handleClose = () => {
    let newState = { ...state };
    newState.displayColorPicker = false;
    setState(newState);
  };
  const handleChange = color => {
    let newState = { ...state };
    newState.color = color.rgb;
    setState(newState);
  };

  return (
    <div>
      <div className={classes.swatch} onClick={handleClick}>
        <div className={classes.color} />
      </div>
      {state.displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
