'use strict';

const Mongoose = require('mongoose');

const config = require('../config');

const dbUri = 'mongodb://' 
            //  + encodeURIComponent(config.db.username) + ':'
            //  + encodeURIComponent(config.db.password) + '@'
             + config.db.host + ':' + config.db.port + '/' + config.db.name;

Mongoose.connect(dbUri, { useMongoClient: true });

Mongoose.Promise = global.Promise;

Mongoose.connection.on('error', (err) => { throw err; });

module.exports = {  
	models: {
		UserModel: require('./schemas/user.js'),
    IssueModel: require('./schemas/issue.js')
	}
};