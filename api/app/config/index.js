'use strict';

const config = require('./config.json');

function init() {
  if (process.env.NODE_ENV === 'production') {
    return config.prod;
  } else {
    return config.dev;
  }
}

module.exports = init();