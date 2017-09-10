'use srtict';

import Reflux from 'reflux';

import LoginAction from'../actions/login.jsx';

let _user = {};

const LoginStore = Reflux.createStore({
  init() {
    this.listenTo(LoginAction.Login, 'onLogin');
  },

  fetchUser() {
    let curUser = sessionStorage.getItem('user');

    if (curUser) {
      _user = JSON.parse(curUser);
      this.trigger(_user);
    } else {
      this.trigger(null);
    }
  },

  onLogin(userData) {
    fetch('localhost:3000/login', { 
      method: 'POST', 
      body:userData
    })
    .then((res) => {
      if (res.status !== 401) {
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
  }
});

LoginStore.getUser = function() {
  return sessionStorage.getItem('user');
};

export default LoginStore;