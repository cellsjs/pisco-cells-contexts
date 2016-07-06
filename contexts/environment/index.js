'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'environment') {
      return true;
    }
    const bowerJson = fsUtils.readJSON('bower.json');

    return bowerJson.name
      && bowerJson.name === 'repo-configs'
      && fsUtils.isDirectory('projects')
      && fsUtils.isDirectory('components');
  }

};
