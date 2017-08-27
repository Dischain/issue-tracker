'use strict';

const User  = require('./models/user.js');
const Issue = require('./models/issue.js');

User.create({ 
  userName: 'sano4',
  email: 'sano4@ya.ru',
  password: 'pas'
})
.then(() => User.findAll() )
.then(console.log)
.catch(console.log);