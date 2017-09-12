'use srtict';

import Reflux from 'reflux';

import LoginAction from'../actions/login.jsx';
import RegisterAction from'../actions/register.jsx';

let _user = {};

const AuthStore = Reflux.createStore({
  init() {
    this.listenTo(LoginAction.Login, 'onLogin');
    this.listenTo(RegisterAction.Register, 'onRegister');
  },

  fetchUser() {
    console.log('context' + this.context);
    let curUser = sessionStorage.getItem('user');

    if (curUser) {
      _user = JSON.parse(curUser);
      this.trigger(_user);
    } else {
      this.trigger(null);
    }
  },

  onLogin(userData) {
    fetch('http://localhost:3001/login', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify(userData)
    })
    .then((res) => {
      if (res.status === 200) {
        _user = res.body;
        sessionStorage.setItem('user', JSON.stringify(_user));
        this.trigger(_user);
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      this.trigger(null);
    });
  },

  onRegister(userData) {
    fetch('http://localhost:3001/register', { 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify(userData)
    })
    .then((res) => {
      if (res.status === 201) {
        _user = res.body;
        console.log(_user);
        sessionStorage.setItem('user', JSON.stringify(res.body));
        this.trigger(res.body);
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      console.log(err);
      this.trigger(null);
    });
  }
});

AuthStore.getUser = function() {
  return sessionStorage.getItem('user');
};

export default AuthStore;