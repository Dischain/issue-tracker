'use strict';

const router = require('express').Router();
const passport = require('passport');

const Users = require('../models/user.js');

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  
  Users.findById(userId)
  .then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404); res.end();
    }
  })
  .catch((err) => {
    res.status(500).
    json({ message: 'Internal Server Error: ' + err });
  });
});

router.post('/register', (req, res) => {
  const credentials = {
    'username': req.body.username, 
    'password': req.body.password,
    'email': req.body.email
  };

  Users.find({ username: { $regex: new RegExp('^' + credentials.username + '$', 'i')}, socialId: null })
  .then((user) => {
    if(user){
      res.send({ message: 'Username already exists' });
      res.redirect('/register');
      res.end();
    } else {
      Users.create(credentials)
      then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.status(500).
        json({ message: 'Internal Server Error: ' + err });
      });
    }
  });
});

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();

  req.session = null;

  res.redirect('/');
});

module.exports = router;