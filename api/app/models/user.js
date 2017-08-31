'use strict';

const UserModel = require('../db').models.UserModel;

/**
 * userData: { 
 *   userName <String>
 *   email <String>
 *   password: <String>
 *   socialId: <Number>
 *   avatar: <String>
 * }
 * 
 * @param {Object} userData 
 */
function create(userData) {
  let user = new UserModel(userData);

  return user.save();
}

function findById(userId) {
  return UserModel.findOne({userId: userId});
}

function find(criteria) {
  return UserModel.find(criteria);
}

function findAll() { 
  return UserModel.find({});
}

module.exports = {
  create: create,
  find: find,
  findById: findById,
  findAll: findAll
};