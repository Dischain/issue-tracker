'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Form } from 'react-bootstrap';

import LonginAction from '../actions/login.jsx';
import ControlledInput from '../components/controlledinput.jsx';

const Login = React.createClass({
  handleSubmit(event) {
    // validate input
    LonginAction.Login(event.target.elements);
  },

  getEmailValidaytionState(value) {
    if (value.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/i)) 
      return 'success';
    else 
      return 'error';
  },

  getPasswordValidationState(value) {
    if (value.length >= 8)
      return 'success';
    else 
      return 'error';
  },

  render() {
    return (
      <div>
        <Form>
          <ControlledInput
            constrolId={'email'}
            validationState={this.getEmailValidaytionState}
            label={'Email'}
            type={'text'}
            placeholder={'Enter your email'}
            helpBlock={''}
          />
          <ControlledInput
            constrolId={'password'}
            validationState={this.getPasswordValidationState}
            label={'Password'}
            type={'text'}
            placeholder={'Enter your password'}
            helpBlock={'Password should contains minimum 8 characters'}
          />
        </Form>
        
        <Link to='/register'>Register</Link>
      </div>
    );
  }
});

export default Login;