'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

let init = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {    
    User.find({ _id: id })
      .then((user) => done(null, user));
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, (email, password, done) => {

      User.find({ email: email, socialId: null })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        user.validatePassword(password)
          .then((isMatch) => {
            isMatch ? 
              done(null, user) : 
              done(null, false, { message: 'Incorrect username or password'})
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));

  return passport;
};

module.exports = init();