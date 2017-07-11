'use strict';


const expect = require('chai').expect;
const iosApp = require('../../../contexts/ios-app/index');
const pctp = require('pisco-callback-to-promise');
const childProcess = require('child_process');
const fs = require('fs-extra');

/* global define, it, describe, before, afterEach */
describe('Testing the ios-app context', () => {
  const currentDirectory = process.cwd();
  const PROJECT_TO_ANALYZE = __dirname + '/tmp';
  beforeEach('Creating folders', (done)=>{
    pctp.c2p(fs.mkdir, PROJECT_TO_ANALYZE).then(done);
  });
  it('Should say is not a ios-app context', () => {
    //Assert
    expect(iosApp.check()).to.be.false;
  });
  it('Should say it is a ios-app context', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
    var fd = fs.openSync('sampleProject.xcodeproj', 'w');
    //Assert
    expect(iosApp.check()).to.be.true;
  });
  it('Should say it is a ios-app context', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
    var fd = fs.openSync('sampleWorkspace.xcworkspace', 'w');
    //Assert
    expect(iosApp.check()).to.be.true;
  });
  it('Should say it is a ios-app context', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
    var fd1 = fs.openSync('sampleWorkspace.xcworkspace', 'w');
    var fd2 = fs.openSync('sampleProject.xcodeproj', 'w');
    //Assert
    expect(iosApp.check()).to.be.true;
  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);
    fs.removeSync(PROJECT_TO_ANALYZE);
  });
});