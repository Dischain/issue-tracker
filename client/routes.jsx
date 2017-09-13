'use strict';

import Main from './pages/main.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Issue from './pages/issue.jsx';
import IssueEdit from './pages/issue_edit.jsx';
    // import User from './pages/user.jsx';
import Layout from './layout.jsx';

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import createHistory from 'history/createBrowserHistory';
//const browserHistory = createHistory();

import AuthStore from './stores/auth.jsx';

function authenticate(nextState, replace) {
  if (AuthStore.getUser() != null) {
    console.log(AuthStore.getUser());
    console.log('redirecting...');
    replace('/issues');
  } else {
    console.log('not authenticated');
    replace('/login');
  }
}

const Routes = (
  <Router history={browserHistory}>
    
    <Route component={Layout}>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/' component={Main} onEnter={authenticate}/>
    </Route>
  </Router>
);

// const Routes = (
//   <Router history={browserHistory}>
//     <Route component={Layout}>
//       <Route path='/login' component={Login}/>
//       <Route path='/register' component={Register}/>
//       <Route path='/' component={Main} onEnter={authenticate}/>
//     </Route>
//   </Router>
// );

// <Route path='users/:userId' component={User}/>
export default Routes;