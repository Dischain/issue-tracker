'use strict';

import React from 'react';
import Reflux from 'reflux';

import AuthStore from './stores/auth.jsx';

const Layout = React.createClass({
  mixins: [
    Reflux.listenTo(AuthStore, 'onAuth')
  ],

  getInitialState() {
    return { curUser: null };
  },

  onAuth(userData) {
    this.setState({ curUser: userData });
    console.log(this.state);
    if (this.state.curUser != null){
      this.props.history.replace('/user/' + userData.userId);
    }
  },

  componentDidMount() {
    console.log('component did mount');
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