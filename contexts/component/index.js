'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'component') {
      return true;
    }
    const bowerJson = fsUtils.readJSON('bower.json');

    return ! fsUtils.exists('package.json') && bowerJson.dependencies
      && bowerJson.dependencies.polymer
      && bowerJson.name
      && bowerJson.name !== 'repo-configs';
  }

};
