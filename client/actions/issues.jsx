'use strict';

import Reflux from 'reflux';

const IssuesAction = {
  FetchUserIssues: Reflux.createAction('FetchUserIssues'),
  FetchAllIssues: Reflux.createAction('FetchAllIssues'),
  FetchIssuesByStatus: Reflux.createAction('FetchIssuesByStatus'),

  CreateIssue: Reflux.createAction('CreateIssue')
};

export default IssuesAction;