'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'component') {
      return true;
    }
    const bowerJson = fsUtils.readJSON('bower.json');

    function firstBowerProperties() {
      return bowerJson.hasOwnProperty('dependencies')
        && bowerJson.dependencies.hasOwnProperty('polymer')
        && bowerJson.hasOwnProperty('name');
    }

    function bowerCharacteristics() {
      return firstBowerProperties()
        && bowerJson.name !== 'repo-configs'
        && !bowerJson.hasOwnProperty('variants');
    }

    return !fsUtils.exists('package.json')
      && bowerCharacteristics();
  }

};
