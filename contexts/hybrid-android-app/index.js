'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {

  check() {
    var files = fs.readdirSync('.');
    var isWwwDir = false;
    var appGradleFiles = [];

    // ProjectName -> exists and contains gradle files
    const currentDir = process.cwd();
    const gradleFiles = files.filter(file => (file.endsWith('.gradle')));
    const appFiles = files.filter(file => (file.startsWith('app')));

    // ProjectName/app -> exists and contains appGradleFile
    if(appFiles.length > 0) {
      process.chdir('app/');
      files = fs.readdirSync('.');
      const srcFiles = files.filter(file => (file.startsWith('src')));
      appGradleFiles = files.filter(file => (file.endsWith('.gradle')));

      // ProjectName/app/src -> exists
      if(srcFiles.length > 0) {
        process.chdir('src/');
        files = fs.readdirSync('.');
        const mainFiles = files.filter(file => (file.startsWith('main')));

        // ProjectName/app/src/main -> exists
        if(mainFiles.length > 0) {
          process.chdir('main/');
          files = fs.readdirSync('.');
          const assetsFiles = files.filter(file => (file.startsWith('assets')));

          // ProjectName/app/src/main/assets -> exists
          if(assetsFiles.length > 0) {
            process.chdir('assets/');
            files = fs.readdirSync('.');
            const wwwFiles = files.filter(file => (file.startsWith('www')));

            // ProjectName/app/src/main/assets/www -> exists and is directory
            if(wwwFiles.length > 0) {
              process.chdir(currentDir);
              isWwwDir = fs.statSync(`${currentDir}/app/src/main/assets/www/`).isDirectory();
            }
          }
        }
      }
    }

    return gradleFiles.length > 1 && appGradleFiles.length > 0 && isWwwDir;
  }
};