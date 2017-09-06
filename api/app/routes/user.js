'use strict';

const router = require('express').Router();
const passport = require('passport');

const Users = require('../models/user.js');

// router.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.redirect('/users');
//   } else {
//     res.status(403);
//     res.json({ 'msg': 'Please log in' });
//   }
// });

router.get('/users/:userId', (req, res) => {
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

router.get('/users', (req, res) => {
  Users.findAll()
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    res.status(500).
    json({ message: 'Internal Server Error: ' + err });
  });
});

// router.delete('/users', (req, res) => {
//   Users.deleteAll()
//   .then(() => { res.status(200); res.end(); })
//   .catch((err) => {
//     res.status(500).
//     json({ message: 'Internal Server Error: ' + err });
//   });
// });

router.post('/register', (req, res) => {
  const credentials = {
    'userName': req.body.userName, 
    'password': req.body.password,
    'email': req.body.email
  };
  Users.find({ email: credentials.email, socialId: null })
  .then((user) => {
    if(user){
      res.status(409);
      res.json({ message: 'Username already exists' });
    } else {
      Users.create(credentials)
      .then((user) => {
        const userData = {
          userName: user.userName,
          email: user.email,
          userId: user.userIds
        };

        res.status(201);
        res.json(user);
      })
      .catch((err) => {
        res.status(500).
        json({ message: 'Internal Server Error: ' + err });
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (user) {
      req.logIn(user, (err) => {
        if (err) return next(err);

        res.sendStatus(200);
      });
    } else {

      res.sendStatus(401);
    }
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();

  req.session = null;

  res.sendStatus(200);
});

module.exports = router;