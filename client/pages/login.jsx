'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Form, Button } from 'react-bootstrap';

import LonginAction from '../actions/login.jsx';
import ControlledInput from '../components/controlledinput.jsx';

const Login = React.createClass({
  getInitialState() {
    return { email: '', password: '' };
  },

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  },

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
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

  onSubmit(event) {
    event.preventDefault();
    // validate input
    LonginAction.Login(this.state);
    console.log('submit');
    console.log(this.state);
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
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <ControlledInput
            constrolId={'password'}
            validationState={this.getPasswordValidationState}
            label={'Password'}
            type={'password'}
            placeholder={'Enter your password'}
            helpBlock={'Password should contains minimum 8 characters'}
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <Button type="submit" 
            onClick={this.onSubmit}
            className='btn btn-primary'>
            Submit
          </Button>
        </Form>
        
        <Link to='/register'>Register</Link>
      </div>
    );
  }
});

export default Login;