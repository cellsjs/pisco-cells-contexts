'use strict';

const fs = require('fs');

module.exports = {

  check() {
    const files = fs.readdirSync('.');

    //1st exists xcode project or xcode workspace
    const xcodeFiles = files.filter(file => (file.endsWith('.xcodeproj') || file.endsWith('.xcworkspace')));

    //2nd exists a folder inside the sources folder called 'www'
    let projectName = 'NoName';
    let existsWWWasDir = false;

    if (xcodeFiles.length > 0) {
      projectName = xcodeFiles[0].substr(0, xcodeFiles[0].indexOf('.'));
      const sourcesFolder = fs.readdirSync(projectName);
      const webFolder = sourcesFolder.filter(file => (file.startsWith('www')));

      //3rd the 'www' element is a directory
      if (webFolder.length > 0) {
        existsWWWasDir = fs.statSync(projectName + '/www').isDirectory;
      }
    }

    //4th exists two files called Podfile and one of them is 'Podfile.lock'
    const podfiles = files.filter(file => (file.startsWith('Podfile')));
    const podfileLock = podfiles.filter(file => (file.startsWith('Podfile') && file.endsWith('.lock')));

    return xcodeFiles.length > 0
      && existsWWWasDir
      && podfileLock.length > 0
      && podfiles.length > 1;

  }

};