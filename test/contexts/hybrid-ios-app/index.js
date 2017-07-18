'use strict';


const expect = require('chai').expect;
const hybridIosApp = require('../../../contexts/hybrid-ios-app/index');
const pctp = require('pisco-callback-to-promise');
const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');

/* global define, it, describe, before, afterEach */
describe('Testing the hybrid-ios-app context', () => {
  const currentDirectory = process.cwd();
  const PROJECT_TO_ANALYZE = __dirname + '/sample';
  beforeEach('Creating folders', (done)=>{
    pctp.c2p(fs.mkdir, PROJECT_TO_ANALYZE).then(done);
  });
  it('Should say is not a hybrid-ios-app context. Empty project.', () => {
    //Assert 
    expect(hybridIosApp.check()).to.be.false;
  });
  it('Should say is not a hybrid-ios-app context. Only exists PodFile.', () => {
    process.chdir(PROJECT_TO_ANALYZE);
    const fpodfile = fs.openSync('Podfile', 'w');
    //Assert 
    expect(hybridIosApp.check()).to.be.false;
  });
  it('Should say is not a hybrid-ios-app context. Only exists PodFile.lock.', () => {
    process.chdir(PROJECT_TO_ANALYZE);
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    //Assert 
    expect(hybridIosApp.check()).to.be.false;
  });
  it('Should say is not a hybrid-ios-app context. www folder missing and xcodeproj or xcworkspace.', () => {
    process.chdir(PROJECT_TO_ANALYZE);
    const fpodfile = fs.openSync('Podfile', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      //Assert 
      expect(hybridIosApp.check()).to.be.false;

    });
  });
  it('Should say is not a hybrid-ios-app context. Missing and xcodeproj or xcworkspace.', () => {
    process.chdir(PROJECT_TO_ANALYZE);
    const fpodfile = fs.openSync('Podfile', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      process.chdir(PROJECT_TO_ANALYZE+'/sample');
      const WWW_PROJECT = SAMPLE_PROJECT + '/www';

      return pctp.c2p(fs.mkdir, WWW_PROJECT).then(() => {
        process.chdir(PROJECT_TO_ANALYZE);
        //Assert 
        expect(hybridIosApp.check()).to.be.false; 
        return Promise.resolve();
      })
      .catch(err => { throw err });

    });
  });
  it('Should say is not a hybrid-ios-app context. Missing Podfile.', () => {
    process.chdir(PROJECT_TO_ANALYZE);
    const fd = fs.openSync('sample.xcodeproj', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      process.chdir(PROJECT_TO_ANALYZE+'/sample');
      const WWW_PROJECT = SAMPLE_PROJECT + '/www';

      return pctp.c2p(fs.mkdir, WWW_PROJECT).then(() => {
        process.chdir(PROJECT_TO_ANALYZE);
        //Assert 
        expect(hybridIosApp.check()).to.be.false; 
        return Promise.resolve();
      })
      .catch(err => { throw err });

    });
  });
  it('Should say it is a hybrid-ios-app context. Complete project with .xcodeproj.', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
	  const fd = fs.openSync('sample.xcodeproj', 'w');
    const fpodfile = fs.openSync('Podfile', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      process.chdir(PROJECT_TO_ANALYZE+'/sample');
      const WWW_PROJECT = SAMPLE_PROJECT + '/www';

      return pctp.c2p(fs.mkdir, WWW_PROJECT).then(() => {
        process.chdir(PROJECT_TO_ANALYZE);
        //Assert
        expect(hybridIosApp.check()).to.be.true;  
        return Promise.resolve();
      })
      .catch(err => { throw err });

    });

  });
  it('Should say it is a hybrid-ios-app context. Complete project with .xcworkspace.', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
	  const fd = fs.openSync('sample.xcworkspace', 'w');
    const fpodfile = fs.openSync('Podfile', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      process.chdir(PROJECT_TO_ANALYZE+'/sample');
      const WWW_PROJECT = SAMPLE_PROJECT + '/www';

      return pctp.c2p(fs.mkdir, WWW_PROJECT).then(() => {
        process.chdir(PROJECT_TO_ANALYZE);
        //Assert
        expect(hybridIosApp.check()).to.be.true;  
        return Promise.resolve();
      })
      .catch(err => { throw err });

    });

  });
  it('Should say it is a hybrid-ios-app context. Complete project with .xcodeproj and .xcworkspace.', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
	  var fd1 = fs.openSync('sample.xcworkspace', 'w');
    var fd2 = fs.openSync('sample.xcodeproj', 'w');
    const fpodfile = fs.openSync('Podfile', 'w');
    const fpodfilelock = fs.openSync('Podfile.lock', 'w');
    const SAMPLE_PROJECT = PROJECT_TO_ANALYZE+'/sample';

    return pctp.c2p(fs.mkdir, SAMPLE_PROJECT).then(() => {

      process.chdir(PROJECT_TO_ANALYZE+'/sample');
      const WWW_PROJECT = SAMPLE_PROJECT + '/www';

      return pctp.c2p(fs.mkdir, WWW_PROJECT).then(() => {
        process.chdir(PROJECT_TO_ANALYZE);
        //Assert
        expect(hybridIosApp.check()).to.be.true;  
        return Promise.resolve();
      })
      .catch(err => { throw err });

    });

  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);
    fs.removeSync(PROJECT_TO_ANALYZE);
  });
});