import React, { useEffect, useState, useCallback } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import getItemsAction from "../store/actions/getItemsAction";
import loadingAction from "../store/actions/loadingAction";

import HomeCard from "../components/Home/HomeCard";

import { withRouter } from "react-router-dom";


const Home = withRouter(({ getItems, loading, novels, shortStories }) => {

  useEffect(() => {
    getItems("shortStory", "shortStories");
    getItems("novel", "novels");
  }, []);


  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Quick summary</Typography>
          </Grid>
          {[{ name: "Novels", data: novels && [...novels], url: "novels" }, { name: "Short stories", data: shortStories && [...shortStories], url: "short-story" }].map(item => (
            <HomeCard key={item.name} type={item.url} loading={loading} cardTitle={item.name} data={item.data} />
          ))}
        </Grid>
      </Container>
    </div>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (modelName, object, args, loadingComponent) => dispatch(getItemsAction(modelName, object, args, loadingComponent)),
    setLoading: (component) => dispatch(loadingAction(component)),
  };
};

const mapStateToProps = (state) => {
  const { loading } = state;
  const { novels, shortStories } = state.items;
  return {
    loading,
    novels,
    shortStories
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
