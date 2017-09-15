'use strict';

const router = require('express').Router();

const Issues = require('../models/issue.js');
const Users = require('../models/user.js');

router.get('/issues', Users.isAuthenticated, (req, res) => {
  Issues.findAll()
  .then((data) => {
    res.json(JSON.stringify(data));
  })
  .catch((err) => {
    res.status(500).
    json({ message: 'Internal Server Error: ' + err });
  });
});

router.get('/issues/:status', Users.isAuthenticated, (req, res) => {
  const criteria = {};
  criteria.status = req.params.status;

  Issues.filterByStatus(criteria)
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json(JSON.stringify({ _metadata: metadata, records: issues }));
    })
    .catch((err) => {
      res.status(500).
      json({ message: 'Internal Server Error: ' + err });
    });
});

router.get('/issues/user/:userId', Users.isAuthenticated, (req, res) => {
  const userId = req.params.userId;

  Issues.findByOwnerId(userId)
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json(JSON.stringify({ _metadata: metadata, records: issues }));
    })
    .catch((err) => {
      res.status(500).
      json({ message: 'Internal Server Error: ' + err });
    });
});

router.post('/issues', Users.isAuthenticated, (req, res) => {
  const issueData = req.body;
  issueData.ownerId = req.user.userId;

  Issues.create(issueData)
  .then((issue) => {
    issueData.issueId = issue.issueId;
    res.status(201).json(JSON.stringify(issueData));
  })
  .catch((err) => {
    res.status(500); 
    res.json({message: 'Internal Server Error: ' + err });
  });
});

router.put('/issues/:issueId', Users.isAuthenticated, (req, res) => {
  const issueId = req.params.issueId;
  const updateData = req.body;

  Issues.update(issueId, updateData)
  .then((issue) => {
    res.status(201).json(JSON.stringify(issue));
  })
  .catch((err) => {
    res.status(500); 
    res.json({message: 'Internal Server Error: ' + err });
  });
});

router.delete('/issues/:issueId', Users.isAuthenticated, (req, res) => {
  const issueId = req.body.issueId;

  Issues.deleteById(issueId)
  .then(() => { res.status(200); res.end(); })
  .catch((err) => {
    res.status(500); 
    res.json({message: 'Internal Server Error: ' + err });
  });
});

// router.delete('/issues', (req, res) => {
//   Issues.deleteAll()
//   .then(() => { res.status(200); res.end(); })
//   .catch((err) => {
//     res.status(500); 
//     res.json({message: 'Internal Server Error: ' + err });
//   });
// });

module.exports = router;