'use strict';

import Reflux from 'reflux';

const IssuesAction = {
  FetchUserIssues: Reflux.createAction('FetchUserIssues'),
  FetchAllIssues: Reflux.createAction('FetchAllIssues'),
  FetchIssuesByStatus: Reflux.createAction('FetchIssuesByStatus')
};

export default IssuesAction;