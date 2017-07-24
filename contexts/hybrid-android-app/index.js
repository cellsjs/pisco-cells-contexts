'use strict';

const fs = require('fs');
const path = require('path');


module.exports = {

  check() {
    const isGradleFile = file => file.endsWith('.gradle');

    const projectPath = process.cwd();
    const appPath = `${projectPath}/app`;
    const wwwPath = `${projectPath}/app/src/main/assets/www/`;

    let isAppGradleFiles = false;
    let isProjectGradleFiles = false;

    const isWwwDir = fs.existsSync(wwwPath) && fs.statSync(wwwPath).isDirectory();

    if (isWwwDir) {
      isAppGradleFiles = fs.readdirSync(appPath).filter(isGradleFile).length > 0;
      isProjectGradleFiles = fs.readdirSync(projectPath).filter(isGradleFile).length > 0;

      return isAppGradleFiles && isProjectGradleFiles;
    }

    return false;
  }
};