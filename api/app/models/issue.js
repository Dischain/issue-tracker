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

function findById(issueId) {
  return IssueModel.findOne({issueId: issueId});
}

function findAll() {
  return IssueModel.find({});
}

function deleteById(issueId) {
  return IssueModel.remove({issueId: issueId});
}

function deleteAll() {
  return IssueModel.remove({});
}

function update(issueId, updateData) {
  return IssueModel.findOne({ issueId: issueId })
  .then((issue) => {
      Object.keys(issue._doc).forEach((key) => {
        updateData[key] && (issue[key] = updateData[key]);
      });

      return issue.save();
  });
}

module.exports = {
  filterByStatus: filterByStatus,
  create: create,
  findById: findById,
  findAll: findAll,
  deleteById: deleteById,
  deleteAll: deleteAll,
  update: update
};