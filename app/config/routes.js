import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Main from '../containers/main/Main';

export let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
    </Route>
  </Router>
);
