'use srtict';

import Reflux from 'reflux';

import IssuesAction from'../actions/issues.jsx';

let _issues = [];

const IssuesStore = Reflux.createStore({
  init() {
    this.listenTo(IssuesAction.FetchUserIssues, 'onFetchUserIssues');
    this.listenTo(IssuesAction.FetchAllIssues, 'onFetchAllIssues');
    this.listenTo(IssuesAction.FetchIssuesByStatus, 'onFetchIssuesByStatus');

    this.listenTo(IssuesAction.CreateIssue, 'onCreateIssue');
  },

  onFetchUserIssues(userId) {
    fetch('http://localhost:3001/issues/user/' + userId)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
          .then((json) => {
            _issues = JSON.parse(json);
            this.trigger(_issues);
          });
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      this.trigger(null);
    });
  },

  onFetchAllIssues() {
    fetch('http://localhost:3001/issues')
    .then((json) => {
      if (res.status === 200) {
        return res.json()
          .then((json) => {
            _issues = JSON.parse(json);
            this.trigger(_issues);
          });
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      this.trigger(null);
    });
  },

  onFetchIssuesByStatus(status) {
    fetch('http://localhost:3001/issues' + status)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
          .then((json) => {
            _issues = JSON.parse(json);
            this.trigger(_issues);
          });
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      this.trigger(null);
    });
  },

  onCreateIssue(issueData) {
    fetch('http://localhost:3001/issues', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify(issueData)
    })
    .then((res) => {
      if (res.status === 201) {
        return res.json()
          .then((json) => {
            const issue = JSON.parse(json);
            _issues.push(issue);
            this.trigger(_issues);
          });
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      this.trigger(null);
    });
  }
});

export default IssuesStore;