import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Home from "../components/Home";
import Ask from "../components/Ask";
import Main from '../containers/main/Main';

export let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
        <Route path="Ask" component={Ask} />
    </Route>
  </Router>
);
