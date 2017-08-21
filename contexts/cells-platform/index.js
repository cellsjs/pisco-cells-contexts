'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    let contract;
    const file = 'cells-platform.json';
    try {
      contract = fsUtils.readJSON(file);
    } catch (e) {}
    return contract !== undefined && contract.composer !== undefined ;
  }

};

