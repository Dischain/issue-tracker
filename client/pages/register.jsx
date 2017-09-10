'use strict';

import React from 'react';
import { Link } from 'react-router';

const Register = React.createClass({
  render() {
    return (
      <div>
        <p>Hello, this is Register page</p>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
});

export default Register;