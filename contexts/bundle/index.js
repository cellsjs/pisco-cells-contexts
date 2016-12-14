'use strict';

const path = require('path');
const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    const file = path.join('.piscosour','piscosour.json');
    if (fsUtils.exists(file)) {
      const context = fsUtils.readJSON(file).context;
      return context === 'bundle';
    }
    return false;
  }

};
