'use strict';

import React from 'react';
import { Link } from 'react-router';

import LonginAction from '../actions/login.jsx';

const Login = React.createClass({
  handleSubmit(event) {
    // validate input
    LonginAction.Login(event.target.elements);
  },

  render() {
    return (
      <div>
        <p>Hello, this is login page</p>
        <Link to='/register'>Register</Link>
      </div>
    );
  }
});

export default Login;