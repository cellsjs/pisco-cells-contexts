'use strict';

const fs = require('fs');

module.exports = {

  check() {
    const files = fs.readdirSync('.');
    const xcodeFiles = files.filter(file => (file.endsWith('.xcodeproj') || file.endsWith('.xcworkspace')));

    return xcodeFiles.length > 0;
  }

};