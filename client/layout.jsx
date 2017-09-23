'use strict';

import React from 'react';
import Reflux from 'reflux';

import Menu from './components/menu.jsx';
import Footer from './components/footer.jsx';
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
    if (this.state.curUser != null){
      this.props.history.replace('/user/' + userData.userId);
    } else {
      this.props.history.replace('/login');
    }
  },

  componentDidMount() {
    console.log('component did mount');
    AuthStore.fetchUser();
  },

  render() {
    return (
      <div>
        <Menu 
          curUser={this.state.curUser} 
          path={this.props.location.pathname}
        />
        {React.cloneElement(this.props.children, this.state)}
        <Footer/>
      </div>
    );
  }
});

export default Layout;