import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
} from "@material-ui/core";

function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      role="tabpanel"
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs({ tabs }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((item, index) => {
            return <Tab label={item.label} {...a11yProps(index)} />
          })}
        </Tabs>
      </AppBar>
      {
        tabs.map((item, index) => {
          return (
            <TabPanel value={value} index={index}>
              {item.component}
            </TabPanel>
          )
        })
      }
    </div>
  );
}
