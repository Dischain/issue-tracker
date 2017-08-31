'use strict';

const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = Mongoose.Schema;

const issueStatusEnum = ['new', 'open', 'assigned', 'fixed', 'verified', 'closed'];

const IssueSchema = new Schema({
  issueId: { type: Number, default: 1 },
  status: { type: String, enum: issueStatusEnum, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  completionDate: { type: Date },

  _owner: { type: Schema.Types.ObjectId, ref: 'user', require: true }
}, {
  timestamps: true
});

IssueSchema.plugin(autoIncrement.plugin, { model: 'issue', field: 'issueId', startAt: 1 });

const IssueModel = Mongoose.model('issue', IssueSchema);

module.exports = IssueModel;