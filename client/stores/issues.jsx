'use srtict';

import Reflux from 'reflux';

import IssuesAction from'../actions/issues.jsx';

let _issues = [];
// let _issues = { issues: [], metadata: null };

const IssuesStore = Reflux.createStore({
  init() {
    this.listenTo(IssuesAction.FetchUserIssues, 'onFetchUserIssues');
    this.listenTo(IssuesAction.FetchAllIssues, 'onFetchAllIssues');
    this.listenTo(IssuesAction.FetchIssuesByStatus, 'onFetchIssuesByStatus');

    this.listenTo(IssuesAction.CreateIssue, 'onCreateIssue');
  },

  onFetchUserIssues(userId) {
    fetch('http://localhost:3001/issues/user/' + userId, {
      mode: 'cors',
      credentials: 'include',
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
          .then((json) => {
            let data = JSON.parse(json);
            _issues = _issues.concat(data.records);
            console.log('after recieving from api:');
            console.log(_issues);
            this.trigger(_issues);
          });
      } else {
        this.trigger(null);
      }
    })
    .catch((err) => {
      console.log(err);
      //this.trigger(null);
    });
  },

  onFetchAllIssues() {
    fetch('http://localhost:3001/issues', {
      mode: 'cors',
      credentials: 'include',
    })
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
    fetch('http://localhost:3001/issues' + status, {
      mode: 'cors',
      credentials: 'include',
    })
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
    console.log('creating issue');
    fetch('http://localhost:3001/issues', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      method: 'POST', 
      body: JSON.stringify(issueData)
    })
    .then((res) => {
      console.log('status: ' + res.status);
      if (res.status === 201) {
        return res.json()
          .then((json) => {
            const issue = JSON.parse(json);
            _issues.push(issue);
            this.trigger(_issues);
          });
      } else {
        console.log('null triggered');
        this.trigger(null);
      }
    })
    .catch((err) => {
      // console.log('err trigered');
      // console.log(err);
      // this.trigger(null);
    });
  }
});

export default IssuesStore;