'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Form, Button } from 'react-bootstrap';

import RegisterAction from '../actions/register.jsx';
import ControlledInput from '../components/controlledinput.jsx';

const Register = React.createClass({
  getInitialState() {
    return { userName: '', email: '', password: '' };
  },

  onNameChange(event) {
    this.setState({ userName: event.target.value });
  },

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  },

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  },

  getNameValidaytionState(value) {
    if (value.length >= 4)
      return 'success';
    else
      return 'error';
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
    RegisterAction.Register(this.state);
    console.log('submit');
    console.log(this.state);
  },

  render() {
    return (
      <div>
        <Form>
          <ControlledInput
            constrolId={'userName'}
            validationState={this.getNameValidaytionState}
            label={'Name'}
            type={'text'}
            placeholder={'Enter your name'}
            helpBlock={''}
            value={this.state.userName}
            onChange={this.onNameChange}
          />
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
        
        <Link to='/login'>Login</Link>
      </div>
    );
  }
});

export default Register;