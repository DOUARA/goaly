import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";

// Component Style
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "60px !important",
    height: "60px",
    boxShadow: `0px 1px 4px ${theme.palette.gray.main}`,
    marginLeft: "2px",
    justifyContent: "center",
    background: "#ffffff"
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    right: theme.spacing(1),
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.gray.main
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 8, 1, 4),
    transition: theme.transitions.create("width"),
    fontSize: "14px",
    width: "100%",
    color: theme.palette.gray.dark,
    height: 30,
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  accountRoot: {
    marginRight: theme.spacing(6),
    "& img": {
      width: 30,
      cursor: "pointer",
      borderRadius: "50%"
    }
  },
  breadcrumbs: {
    marginLeft: theme.spacing(7),
    fontWeight: 700,
    fontSize: 14,
    "& .MuiBreadcrumbs-separator": {
      color: theme.palette.secondary.main
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  desktopMenu: {
    top: "30px !important",
    "& li": {
      padding: "10px 80px 12px 10px !important",
      fontSize: "16px",
      color: theme.palette.gray.dark,

      "& svg": {
        padding: "0px 25px !important",
        color: theme.palette.gray.main,
        width: "18px !important",
        height: "auto"
      }
    }
  }
}));

const TopBar = () => {
  // Component States
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Component ClassNames
  const classes = useStyles();

  // Handle Different Events
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.desktopMenu}
    >
      <NavLink to='/dashboard/profile'>
        <MenuItem onClick={handleMenuClose}>
          <FontAwesomeIcon icon={faUserCircle} />
          Profile
        </MenuItem>
      </NavLink>

      <NavLink to='/'>
        <MenuItem onClick={handleMenuClose}>
          <FontAwesomeIcon icon={faPowerOff} />
          Logout
        </MenuItem>
      </NavLink>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar position='static' className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.leftSide}>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator='>'
              aria-label='breadcrumb'
            >
              <Link color='primary' href='/dashboard'>
                Dashboard
              </Link>
              <Typography color='primary'>Profile</Typography>
            </Breadcrumbs>
          </div>
          <div className={classes.rightSide}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <OutlinedInput
                placeholder='Search Goals...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                variant='outlined'
                inputProps={{ "aria-label": "Search Goals" }}
              />
            </div>
            <div className={classes.accountRoot}>
              <img
                alt='Profile Pic'
                onClick={handleProfileMenuOpen}
                src='https://cv.douara.me/images/main_photo.jpg'
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Fragment>
  );
};

export default TopBar;
