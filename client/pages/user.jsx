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
    // this is for test
    // console.log(this.props);
    // console.log(this.context);
    //IssuesAction.FetchUserIssues()
  },

  componentDidMount() {
    // const issue = {
    //   status: 'new',
    //   title: 'new issue'
    // };
    // IssuesAction.CreateIssue(issue);
    // console.log('user: component will mount');
    // console.log(this.state);
    // console.log(this.state);
    // console.log(this.props);
    // console.log(this.context);
    IssuesAction.FetchUserIssues(this.props.curUser.userId);
  },

  onIssue(data) {
    console.log('issue recieved:');
    console.log(data);
    this.setState({ issues: data });
  },

  render() {
    console.log(this.state.issues);
    const IL = this.state.issues.map((item, index) => {
      return <li key={index}>{item.status} {item.title}</li>;
    });
    console.log(IL);
    return (
      <div>
        <p>Hello, this is user page</p>
        <ul>{IL}</ul>
      </div>
    );
  }
});

export default User;