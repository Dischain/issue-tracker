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
    return { issues: [] };
  },

  componentWillMount() {
    // this is for test
    const issue = {
      status: 'new',
      title: 'new issue'
    };
    IssuesAction.CreateIssue(issue);
    console.log('user: component will mount');
    console.log(this.state);
    console.log(this.props);
    console.log(this.context);
    //IssuesAction.FetchUserIssues()
  },

  componentDidMount() {

    console.log(this.state);
    console.log(this.props);
    console.log(this.context);
    IssuesAction.FetchUserIssues(this.props.curUser.userId);
  },

  onIssue(data) {
    this.setState({ issues: data });
    console.log(this.state);
  },

  render() {
    console.log(this.props);
    console.log(this.context);

    return (
      <div>
        <p>Hello, this is user page</p>
        {this.state.issues.map((item) => {
          return <p>{item}</p>;
        })}
      </div>
    );
  }
});

export default User;