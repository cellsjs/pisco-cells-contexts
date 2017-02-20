'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    return fsUtils.exists('bower.json') && fsUtils.exists('package.json') && fsUtils.exists('catalog.json')
  }

};
