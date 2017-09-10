'use strict';

import React from 'react';
import Reflux from 'reflux';
import LoginAction from './actions/login.jsx';
import LoginStore from './stores/login.jsx';

const Layout = React.createClass({
  mixins: [
    Reflux.listenTo(LoginStore, 'onLogin')
  ],

  getInitialState() {
    return { user: null };
  },

  onLogin(userData) {
    this.setState({ curUser: userData });
  },

  componentDidMount() {
    LoginStore.fetchUser();
  },

  render() {
    console.log(this.props.location.pathname);
    return (
      <div>
        <p>Menu</p>
        {React.cloneElement(this.props.children, this.state)}
        <p>Footer</p>
      </div>
    );
  }
});

export default Layout;