import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faListAlt,
  faLayerGroup
} from "@fortawesome/free-solid-svg-icons";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    color: "#ffffff",
    "& a": {
      color: "#ffffff"
    },
    fontSize: "16px",
    "& .MuiListItem-button": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },

    "& svg": {
      width: "20px !important",
      height: "auto !important",
      marginLeft: theme.spacing(2)
    },
    "& path": {
      color: "#ffffff"
    }
  },
  main: {
    fontSize: "18px",
    "& svg": {
      width: "22px !important"
    },
    "& span": {
      fontWeight: 900
    },

    marginBottom: theme.spacing(4),

    "&:hover": {
      background: theme.palette.secondary.main
    }
  },
  nested: {
    width: 215,
    paddingLeft: theme.spacing(12),
    marginLeft: theme.spacing(9),
    borderLeft: "1px solid #fff",
    marginTop: "0 !important",
    marginBottom: "0 !important",
    paddingBottom: 0,
    "&:hover": {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main
    }
  }
}));

const SideBarMenu = () => {
  // Component States
  const [openGoals, setOpenGoals] = React.useState(true);
  const [openCats, setOpenCats] = React.useState(true);

  // Component ClassNames
  const classes = useStyles();

  return (
    <Fragment>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.root}
      >
        <NavLink to='/dashboard'>
          <ListItem className={classes.main} button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faTachometerAlt} />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </NavLink>
        <ListItem button onClick={() => setOpenGoals(!openGoals)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faListAlt} />
          </ListItemIcon>
          <ListItemText primary='My Goals' />
          {openGoals ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGoals} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <NavLink to='/dashboard/goals'>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Goals'List" />
              </ListItem>
            </NavLink>
            <NavLink to='/dashboard/new_goal'>
              <ListItem button className={classes.nested}>
                <ListItemText primary='Add new' />
              </ListItem>
            </NavLink>
          </List>
        </Collapse>
        <ListItem button onClick={() => setOpenCats(!openCats)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faLayerGroup} />
          </ListItemIcon>
          <ListItemText primary='Categories' />
          {openCats ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCats} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <NavLink to='/dashboard/categories'>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Categories' List" />
              </ListItem>
            </NavLink>
            <NavLink to='/dashboard/new_category'>
              <ListItem button className={classes.nested}>
                <ListItemText primary='Add new' />
              </ListItem>
            </NavLink>
          </List>
        </Collapse>
      </List>
    </Fragment>
  );
};

export default SideBarMenu;
