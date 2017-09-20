'use strict';

import React from 'react';
import Reflux from 'reflux';

import IssuesStore from '../stores/issues.jsx';
import IssuesAction from '../actions/issues.jsx';

const User = React.createClass({
  mixins: [
    Reflux.listenTo(IssuesStore, 'onIssue')
  ],

  getInitialState() {
    return { issues: [], metadata: null };
  },

  componentWillMount() {

  },

  componentDidMount() {
    IssuesAction.FetchUserIssues(this.props.curUser.userId);
  },

  onIssue(data) {
    this.setState({ issues: data });
  },

  render() {
    const IL = this.state.issues.map((item, index) => {
      return <li key={index}>{item.status} {item.title}</li>;
    });
    return (
      <div>
        <p>Hello, this is user page</p>
        <ul>{IL}</ul>
      </div>
    );
  }
});

export default User;