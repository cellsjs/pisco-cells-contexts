'use strict';

const fsUtils = require('../../lib/fsUtils');

module.exports = {

  check() {
    let contract;
    const file = 'package.json';
    try {
      contract = fsUtils.readJSON(file);
    } catch (e) {
      console.log('Error reading file', file, e);
    }

    return contract !== undefined && contract.cells !== undefined && contract.cells.dependencies !== undefined;
  }

};

