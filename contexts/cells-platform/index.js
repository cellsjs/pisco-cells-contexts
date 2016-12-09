'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    return fsUtils.readJSON('.piscosour/piscosour.json').context === 'cells-platform' ||
      fsUtils.readJSON('package.json').name === 'cells-platform';
  }

};

