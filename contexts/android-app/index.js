'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    return fsUtils.exists('settings.gradle')
      && fsUtils.exists('build.gradle');
  }

};