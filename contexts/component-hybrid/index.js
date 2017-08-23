'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {


  check() {
    const bowerHasProperties = function(bowerJson) {
      return bowerJson.hasOwnProperty('name')
        && bowerJson.hasOwnProperty('variants');
    };
    const hasPolymerDependency = function(bowerJson) {
      return bowerJson.hasOwnProperty('dependencies')
        && bowerJson.dependencies.hasOwnProperty('polymer');
    };
    const bowerCharacteristics = function(bowerJson) {
      return hasPolymerDependency(bowerJson)
        && bowerHasProperties(bowerJson)
        && bowerJson.name !== 'repo-configs';
    };
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'component-hybrid') {
      return true;
    }
    const bowerJson = fsUtils.readJSON('bower.json');

    return !fsUtils.exists('package.json')
      && bowerCharacteristics(bowerJson);
  }

};
