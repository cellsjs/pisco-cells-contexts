'use strict';


const expect = require('chai').expect;
const platform = require('../../../contexts/cells-platform/index');
const pctp = require('pisco-callback-to-promise');
const fs = require('fs-extra');

/* global define, it, describe, before, afterEach */
describe('Testing the cells-platform context', () => {
  const currentDirectory = process.cwd();
  const PROJECT_TO_ANALYZE = __dirname + '/tmp';
  beforeEach('Creating folders', (done)=>{
    pctp.c2p(fs.mkdir, PROJECT_TO_ANALYZE).then(done);
  });
  it('Should say is not a cells-platform context', () => {
    //Assert
    expect(platform.check()).to.be.false;
  });
  it('Should say it not a cells-platform context with wrong cells-platform.json', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
    fs.writeFileSync('cells-platform.json', 'w');
    //Assert
    expect(platform.check()).to.be.false;
  });
  it('Should say it is a cells-platform context', () => {
    //Act
    process.chdir(PROJECT_TO_ANALYZE);
    fs.writeFileSync('cells-platform.json', '{"composer" : ""}');
    //Assert
    expect(platform.check()).to.be.true;
  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);
    fs.removeSync(PROJECT_TO_ANALYZE);
  });
});