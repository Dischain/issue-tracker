'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const issueStatusEnum = ['new', 'open', 'assigned', 'fixed', 'verified', 'closed'];

const IssueSchema = new Schema({
  status: { type: String, enum: issueStatusEnum, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  completionDate: { type: Date },

  _owner: { type: Schema.Types.ObjectId, ref: 'user', require: true }
}, {
  timestamps: true
});

const IssueModel = Mongoose.model('issue', IssueSchema);

module.exports = IssueModel;