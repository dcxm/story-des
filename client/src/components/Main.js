import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: "2em",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const Main = ({ children, open, isShift }) => {
  const classes = useStyles();

  return (
    <main
      style={!isShift ? { marginLeft: "inherit" } : {}}
      className={clsx(
        classes.content,
        {
          [classes.contentShift]: open,
        }
      )}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};

export default Main;
