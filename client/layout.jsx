'use strict';

import React from 'react';
import Reflux from 'reflux';

import AuthStore from './stores/auth.jsx';

const Layout = React.createClass({
  mixins: [
    Reflux.listenTo(AuthStore, 'onLogin')
  ],

  getInitialState() {
    return { user: null };
  },

  onLogin(userData) {
    console.log('login');
    this.setState({ curUser: userData });
    console.log(this.context);
  },

  componentDidMount() {
    AuthStore.fetchUser();
  },

  render() {
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