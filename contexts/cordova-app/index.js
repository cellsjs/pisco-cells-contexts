'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'cordova-app') {
      return true;
    }
    const config = fsUtils.readJSON('package.json');
    if (config.keywords && config.keywords.indexOf('cells-cordova-app') >= 0) {
      return true;
    }
    return fsUtils.exists('www')
      && fsUtils.exists('config.xml');
  }

};
