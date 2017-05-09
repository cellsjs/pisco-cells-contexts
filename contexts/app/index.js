"use strict";

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    if (fsUtils.readJSON('.piscosour/piscosour.json').context === 'app') {
      return true;
    }
    return fsUtils.exists('app/tpls/index.tpl');
  }

};
