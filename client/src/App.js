import React, { useEffect } from 'react';
import './App.css';

import { useTheme } from '@material-ui/core'
import Fab from './components/Fab';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import ItemsList from './components/ItemsList';
import Details from './pages/Details';

import SideMenu from './components/SideMenu';

import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';


function App({ snackbarOpen, chapterOpen, message, setChapterOpen, setSnackbarOpen, clearSnackbarMessage }) {

  const handleSnackbarClose = () => {
    setSnackbarOpen();
    clearSnackbarMessage();
  }

  return (
    <div className='App' style={{ backgroundColor: '#f1f1f1', minHeight: '100vh', height: '100%' }}>
      <Router basename='/'>
          <Switch>
            <SideMenu>
              <Route exact path='/' component={Home} />
              <Route exact path='/:type' component={ItemsList} />
              <Route exact path='/:type/edit/:id' component={Edit} />
              <Route exact path='/:type/:id' component={Details} />
              <Fab />
            </SideMenu>
          </Switch>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            key={'top, center'}
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            message={message}
          />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { open, message } = state.snackbarReducers;
  const { chapterOpen } = state;
  return {
    snackbarOpen: open,
    message,
    chapterOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbarOpen: () => dispatch({ type: 'SET_SNACKBAR_OPEN' }),
    setChapterOpen: () => dispatch({ type: 'SET_ADD_CHAPTER_OPEN' }),
    clearSnackbarMessage: () => dispatch({ type: 'CLEAR_SNACKBAR_MESSAGE' })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);