'use strict';


const expect = require('chai').expect;
const component = require('../../../contexts/component/index');
const pctp = require('pisco-callback-to-promise');
const fs = require('fs-extra');
const path = require('path');

const BOWER_FILE = path.join(__dirname, 'bower.json');
const BOWER_NAME = 'bower.json';

/* global define, it, describe, before, afterEach */
describe('Testing the component context', () => {
  const currentDirectory = process.cwd();
  const COMPONENT_TO_ANALYZE = __dirname + '/tmp';
  beforeEach('Creating folders', (done)=>{
    pctp.c2p(fs.mkdir, COMPONENT_TO_ANALYZE)
      .then(() => pctp.c2p(fs.copy, BOWER_FILE, path.join(COMPONENT_TO_ANALYZE, BOWER_NAME)))
      .then(() => process.chdir(COMPONENT_TO_ANALYZE))
      .then(done)
      .catch(err => console.log(err));
  });
  it('Should say it is a component context. Bower has no variants', () => {
    //Assert
    expect(component.check()).to.be.true;
  });
  it('Should say is not component context. package.json present', () => {
    //Act
    fs.writeFileSync(path.join(COMPONENT_TO_ANALYZE, 'package.json'), {});

    //Assert
    expect(component.check()).to.be.false;
  });
  it('Should say is not component context. No dependencies', () => {
    //Act
    const bowerFile = fs.readJsonSync(BOWER_NAME);
    delete bowerFile.dependencies;
    fs.writeJsonSync(BOWER_NAME, bowerFile);

    //Assert
    expect(component.check()).to.be.false;
  });
  it('Should say is not component context. No Polymer dependency', () => {
    //Act
    const bowerFile = fs.readJsonSync(BOWER_NAME);
    delete bowerFile.dependencies.polymer;
    fs.writeJsonSync(BOWER_NAME, bowerFile);

    //Assert
    expect(component.check()).to.be.false;
  });
  it('Should say is not component context. No name', () => {
    //Act
    const bowerFile = fs.readJsonSync(BOWER_NAME);
    delete bowerFile.name;
    fs.writeJsonSync(BOWER_NAME, bowerFile);

    //Assert
    expect(component.check()).to.be.false;
  });
  it('Should say is not component context. Name is repo-configs', () => {
    //Act
    const bowerFile = fs.readJsonSync(BOWER_NAME);
    bowerFile.name = 'repo-configs';
    fs.writeJsonSync(BOWER_NAME, bowerFile);

    //Assert
    expect(component.check()).to.be.false;
  });
  it('Should say is not component context. Bower has variants', () => {
    //Act
    const bowerFile = fs.readJsonSync(BOWER_NAME);
    bowerFile.variants = {'1.x': 'whatever'};
    fs.writeJsonSync(BOWER_NAME, bowerFile);

    //Assert
    expect(component.check()).to.be.false;
  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);

    fs.removeSync(COMPONENT_TO_ANALYZE);
  });
});
