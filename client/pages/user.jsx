'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Row } from 'react-bootstrap';

import IssuesStore from '../stores/issues.jsx';
import IssuesAction from '../actions/issues.jsx';
import Sidebar from '../components/sidebar.jsx';
import IssueTable from '../components/issuetable.jsx';

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
    return (
      <div className={'container'}>
        <Sidebar curUser={this.props.curUser}/>
        <div className={'content'}>
          <IssueTable issues={this.state.issues}/>
        </div>
      </div>
    );
  }
});

export default User;