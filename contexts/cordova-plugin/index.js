'use strict';

const fs = require('fs');

const exists = function(what) {
  try {
    fs.statSync(what);
    return true;
  } catch (e) {
    if (e.syscall === 'stat') {
      return false;
    }
    throw e;
  }
};

module.exports = {

  check() {
    return exists('www')
      && exists('plugin.xml')
      && !exists('app');

  }

};