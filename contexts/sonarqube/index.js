'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    return fsUtils.exists('sonar-project.properties');
  }

};
