'use strict';

const expect = require('chai').expect;
const hybridAndroidApp = require('../../../contexts/hybrid-android-app/index');
const pctp = require('pisco-callback-to-promise');
const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');

/* global define, it, describe, before, beforeEach, afterEach, expect, after */
describe('Testing the hybrid-android-app context', () => {
  const currentDir = process.cwd();
  const dummyProjectPath = __dirname + '/dummy';

  beforeEach('Creating Dummy Hybrid Structure', (done) => {
    pctp.c2p(fs.mkdir, dummyProjectPath)
      .then(done);
  });

  it('Should say is not an hybrid-android-app context. Only project gradle files where found.', () => {
    process.chdir(dummyProjectPath);
    const gradleSettings = fs.openSync('settings.gradle', 'w');
    const gradleFile = fs.openSync('build.gradle', 'w');

    expect(hybridAndroidApp.check()).to.be.false;
    return Promise.resolve();
  });

  it('Should say is not an hybrid-android-app context. Only project gradle files and app folder where found.', () => {
    process.chdir(dummyProjectPath);
    const gradleSettings = fs.openSync('settings.gradle', 'w');
    const gradleFile = fs.openSync('build.gradle', 'w');
    const pathToAppFolder = path.join(dummyProjectPath, 'app/');

    return pctp.c2p(fs.mkdir, pathToAppFolder)
      .then(() => {
        process.chdir(pathToAppFolder);
        expect(hybridAndroidApp.check()).to.be.false;
        return Promise.resolve();
      })
      .catch(err => {
        throw err;
      });
  });

  it('Should say is not an hybrid-android-app context. Only project and app gradle files and app folder where found.', () => {
    process.chdir(dummyProjectPath);
    const gradleSettings = fs.openSync('settings.gradle', 'w');
    const gradleFile = fs.openSync('build.gradle', 'w');
    const pathToAppFolder = path.join(dummyProjectPath, 'app/');

    return pctp.c2p(fs.mkdir, pathToAppFolder)
      .then(() => {
        process.chdir(pathToAppFolder);
        const appGradleFile = fs.openSync('build.gradle', 'w');
        process.chdir(dummyProjectPath);
        expect(hybridAndroidApp.check()).to.be.false;

        return Promise.resolve();
      })
      .catch(err => {
        throw err;
      });
  });

  it('Should say is an hybrid-android-app context.', () => {
    process.chdir(dummyProjectPath);
    const gradleSettings = fs.openSync('settings.gradle', 'w');
    const gradleFile = fs.openSync('build.gradle', 'w');
    const pathToAppFolder = path.join(dummyProjectPath, 'app/');
    let pathTest = '';

    return pctp.c2p(fs.mkdir, pathToAppFolder)
      .then(() => {
        process.chdir(pathToAppFolder);
        const appGradleFile = fs.openSync('build.gradle', 'w');
        pathTest = path.join(pathToAppFolder, 'src/');
        return pctp.c2p(fs.mkdir, pathTest);
      })
      .then(() => {
        process.chdir(pathTest);
        pathTest = path.join(pathTest, 'main/');
        return pctp.c2p(fs.mkdir, pathTest);
      })
      .then(() => {
        process.chdir(pathTest);
        pathTest = path.join(pathTest, 'assets/');
        return pctp.c2p(fs.mkdir, pathTest);
      })
      .then(() => {
        process.chdir(pathTest);
        pathTest = path.join(pathTest, 'www/');
        return pctp.c2p(fs.mkdir, pathTest);
      })
      .then(() => {
        process.chdir(dummyProjectPath);
        expect(hybridAndroidApp.check()).to.be.true;
        return Promise.resolve();
      })
      .catch(err => {
        throw err;
      });
  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDir);
    fs.removeSync(dummyProjectPath);
  });
});

