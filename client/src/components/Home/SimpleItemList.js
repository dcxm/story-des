import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import SimpleListActions from "./SimpleListActions";
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from "@material-ui/core/Divider";

import { connect } from "react-redux";

import CompletedButton from '../buttons/CompletedButton'

const SimpleItemList = ({ data, type, loading }) => {
  return (
    <Fade in={true} timeout={1000}>
      <List>
        {data.length > 0 && <Divider />}
        {data.length === 0 ? "No added items here." : data.map(({ dataValues }) => (
          <ListItem divider key={dataValues.id} id={dataValues.id} style={{ minHeight: "5em" }}>
            {loading.component === `item-${dataValues.id}` ? <div align="center" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center",
              width: "100%",
              margin: ".5em"
            }}><CircularProgress color="primary" disableShrink size={30} /></div> :
              <Grid container alignItems="center">
                <Grid item xs={6} md={5} lg={5}>
                  <Typography variant="body1" noWrap={false}>
                    <strong>{dataValues.title}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1} lg={2} align='center'>
                    <CompletedButton item={dataValues} type={type}/>
                </Grid>
                <Grid item xs={4} md={6} lg={5}>
                  <div align="right">
                    <SimpleListActions id={dataValues.id} type={type} itemName={dataValues.title} />
                  </div>
                </Grid>
              </Grid>
            }
          </ListItem>
        ))}
      </List>
    </Fade>
  );
};

const mapStateToProps = (state) => {
  const { loading } = state;
  return {
    loading,
  };
};


export default connect(mapStateToProps)(SimpleItemList);
