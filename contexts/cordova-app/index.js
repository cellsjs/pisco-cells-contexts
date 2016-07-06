'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'cordova-app') {
      return true;
    }
    return fsUtils.exists('www')
      && fsUtils.exists('config.xml');
  }

};
