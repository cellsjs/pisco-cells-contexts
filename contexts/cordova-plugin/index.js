'use strict';

const fsUtils = require('../../lib/fsUtils');


module.exports = {

  check() {
    return fsUtils.exists('www')
      && fsUtils.exists('plugin.xml')
      && !fsUtils.exists('app');

  }

};