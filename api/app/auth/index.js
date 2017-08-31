'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

let init = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById({id})
      .then((user) => done(err, user));
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    User.findById({ username: { $regex: new RegExp('^' + username + '$', 'i')}, socialId: null })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        user.validatePassword(password)
          .then((isMatch) => {
            isMatch ? 
              done(null, user) : 
              done(null, false, { message: 'Incorrect username or password'})
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  }));

  return passport;
}

module.exports = init();