'use strict';

const fs = require('fs');
const path = require('path');


module.exports = {

  check() {
    const isGradleFile = file => file.endsWith('.gradle');
    const isGradle = file => fs.readdirSync(file).filter(isGradleFile).length > 0;

    const projectPath = process.cwd();
    const appPath = `${projectPath}/app`;
    const wwwPath = `${projectPath}/app/src/main/assets/www/`;

    const isWwwDir = fs.existsSync(wwwPath) && fs.statSync(wwwPath).isDirectory();

    if (isWwwDir) {
      return isGradle(appPath) && isGradle(projectPath);
    }

    return false;
  }
};