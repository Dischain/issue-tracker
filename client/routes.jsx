'use strict';

import Main from './pages/main.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Issue from './pages/issue.jsx';
import IssueEdit from './pages/issue_edit.jsx';
import User from './pages/user.jsx';
import Layout from './layout.jsx';

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import createHistory from 'history/createBrowserHistory';
//const browserHistory = createHistory();

import AuthStore from './stores/auth.jsx';

function authenticate(nextState, replace) {
  const curUser = AuthStore.getUser();
  if (curUser != null) {
    replace('/user/' + curUser.userId);
  } else {
    console.log('not authenticated');
    replace('/login');
  }
}

const Routes = (
  <Router history={browserHistory}>
    
    <Route component={Layout} history={browserHistory}>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/' component={Main} onEnter={authenticate}/>
      <Route path='user/:userId' component={User}/>
    </Route>
  </Router>
);

export default Routes;