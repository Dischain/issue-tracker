'use strict';

const IssueModel = require('../db').models.IssueModel;

/**
 * issueData: {
 *   status: <String>
 *   title: <String>
 *   completionData: <Date>
 *   owner: <ObjectId>
 * }
 * @param {*} issueData 
 */
function create(issueData) {
  let issue = new IssueModel(issueData);

  return issue.save();
}

function filterByStatus(filter) {
  return IssueModel.find(filter);
}

function getAll() {
  return IssueModel.findAll();
}

module.exports = {
  filterByStatus: filterByStatus,
  create: create,
  getAll: getAll
};