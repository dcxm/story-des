import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Main from "./Main";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.light
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
    border: "none"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerCollapse: {
    color: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  lightDivider: {
    backgroundColor: theme.palette.secondary.dark,
  },
  listItem: {
    color: theme.palette.secondary.light,
    paddingTop: ".7em",
    paddingBottom: ".7em"
  },
  listItemButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  listItemDivider: {
    borderColor: theme.palette.secondary.normal,
  },
  title: {
    flexGrow: 1,
  }
}));

const SideMenu = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [drVar, setDrVar] = useState("temporary");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const history = useHistory();

  const handleHistoryBack = () => history.length > 0 && history.go(-1);
  const handleHistoryForward = () => history.length > 0 && history.go(1);

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const setDrawerVariant = () => {
    if (matches) setDrVar("temporary")
    else setDrVar("persistent");
  };

  const keyEvents = () => window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "e") {
      if (e.repeat) return;
      console.log(drawerOpen)
      setDrawerOpen(prev => !prev);
    };
    if (e.key === "F1") history.push("/");
  });

  useEffect(() => {
    keyEvents();
    setDrawerVariant();
  }, []);


  window.addEventListener("DOMContentLoaded", setDrawerVariant);
  window.addEventListener("resize", setDrawerVariant);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <Tooltip title="Expand sidebar" placement="bottom-start">
            <IconButton
              aria-label="open drawer"
              onClick={() => setDrawerOpen(!drawerOpen)}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go back" placement="bottom-start">
            <IconButton
              aria-label="go back in history"
              onClick={handleHistoryBack}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go forward" placement="bottom-start">
            <IconButton
              aria-label="go forward in history"
              onClick={handleHistoryForward}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap className={classes.title}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
            >
              Story
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>{" "}
      <Drawer
        className={classes.drawer}
        variant={drVar}
        anchor="left"
        open={drawerOpen}
        PaperProps={{ elevation: 12 }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Tooltip title="Collapse sidebar" placement="left">
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={classes.drawerCollapse}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                  <ChevronRightIcon />
                )}
            </IconButton>
          </Tooltip>
        </div>
        <Divider light={true} classes={{ light: classes.lightDivider }} />
        <List disablePadding>
          {[
            { name: "Novels", link: "/novels" },
            { name: "Short Stories", link: "/short-stories" },
          ].map((text, index) => (
            <ListItem
              component={RouterLink}
              to={text.link}
              button
              key={text.name}
              classes={{
                root: classes.listItem,
                divider: classes.listItemDivider,
                button: classes.listItemButton,
              }}
            >
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={drawerOpen} isShift={!matches}>
        {children}
      </Main>
    </div>
  );
}

export default SideMenu;