'use strict';

const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config = require('../config');

const dbUri = 'mongodb://' 
            //  + encodeURIComponent(config.db.username) + ':'
            //  + encodeURIComponent(config.db.password) + '@'
             + config.db.host + ':' + config.db.port + '/' + config.db.name;

const connection = Mongoose.connect(dbUri, { useMongoClient: true });

Mongoose.Promise = global.Promise;
autoIncrement.initialize(connection);

Mongoose.connection.on('error', (err) => { throw err; });

module.exports = {  
	models: {
		UserModel: require('./schemas/user.js'),
    IssueModel: require('./schemas/issue.js')
	}
};