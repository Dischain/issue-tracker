'use strict';

const router = require('express').Router();

const Issues = require('../models/issue.js');

router.get('/issues', (req, res) => {
  Issues.findAll()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).
    json({ message: 'Internal Server Error: ' + err });
  })
});

router.get('/issues/:status', (req, res) => {
  const criteria = {};
  criteria.status = req.params.status;

  Issues.filterByStatus(criteria)
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((err) => {
      res.status(500).
      json({ message: 'Internal Server Error: ' + err });
    });
});

router.post('/issues', (req, res) => {
  const issueData = req.body;

  Issues.create(issueData)
  .then(() => {
      res.status(201); res.end();
  })
  .catch((err) => {
      res.status(500); 
      res.json({message: 'Internal Server Error: ' + err });
  });
});

router.put('/issues/:issueId', (req, res) => {
  const issueId = req.params.issueId;
  const updateData = req.body;

  Issues.update(issueId, updateData)
  .then(() => {
      res.status(201); res.end();
  })
  .catch((err) => {
      res.status(500); 
      res.json({message: 'Internal Server Error: ' + err });
  });
});

router.delete('/issues/:issueId', (req, res) => {
  const issueId = req.body.issueId;

  Issues.deleteById(issueId)
  .then(() => { res.status(200); res.end(); })
  .catch((err) => {
    res.status(500); 
    res.json({message: 'Internal Server Error: ' + err });
  });
});

module.exports = router;