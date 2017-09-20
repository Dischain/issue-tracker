'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Row } from 'react-bootstrap';

import IssuesStore from '../stores/issues.jsx';
import IssuesAction from '../actions/issues.jsx';
import Sidebar from '../components/sidebar.jsx';

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
      <Row className='show-grid'>
        <Sidebar curUser={this.props.curUser}/>
        <div className='col-sm-9'>
          <ul>{IL}</ul>
        </div>
      </Row>
    );
  }
});

export default User;