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
  return UserModel.findOne(criteria);
}

function findAll() { 
  return UserModel.find({});
}

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

function deleteAll() {
  return UserModel.remove({});
}

module.exports = {
  create: create,
  find: find,
  findById: findById,
  findAll: findAll,
  isAuthenticated: isAuthenticated,
  deleteAll: deleteAll
};