'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'component-hybrid') {
      return true;
    }
    const bowerJson = fsUtils.readJSON('bower.json');

    return !fsUtils.exists('package.json')
      && bowerJson.hasOwnProperty('dependencies')
      && bowerJson.dependencies.hasOwnProperty('polymer')
      && bowerJson.hasOwnProperty('name')
      && bowerJson.name !== 'repo-configs'
      && bowerJson.hasOwnProperty('variants');
  }

};
