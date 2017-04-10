'use strict';

const fs = require('fs');

module.exports = {

  check() {

    fs.readdir(__dirname, (err, files) => {
      files	.filter( function(file) {
              return file.endsWith('.xcodeproj');})
    });

  }

};