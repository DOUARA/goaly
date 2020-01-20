import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Navigation from "../navigation";

const useStyles = theme => ({
  side: {
    width: 250
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block"
    }
  },
  menuIcon: {
    width: "2.5em",
    height: "2.5em"
  }
});

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      right: false
    };
  }
  render() {
    const { classes } = this.props;

    const toggleDrawer = (side, open) => event => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      this.setState({ ...this.state, [side]: open });
    };

    const sideMenu = side => (
      <div
        className={classes.side}
        role='presentation'
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <Navigation mobile={true} />
      </div>
    );

    return (
      <Fragment>
        <Navigation />
        <div className={classes.mobileMenu}>
          <IconButton
            edge='start'
            color='primary'
            aria-label='menu'
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Drawer
            anchor='right'
            open={this.state.right}
            onClose={toggleDrawer("right", false)}
          >
            {sideMenu("right")}
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Menu);
