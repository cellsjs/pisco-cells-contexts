'use strict';

const path = require('path');
const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    return fsUtils.readJSON('.piscosour/piscosour.json').context === 'catalog';
  }

};
