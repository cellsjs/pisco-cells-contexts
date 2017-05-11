'use strict';

const expect = require('chai').expect;
const sonarqube = require('../../../contexts/sonarqube/index');

/* global define, it, describe, before, afterEach */
describe('Testing the sonarqube context', () => {
  const currentDirectory = process.cwd();
  const PROJECT_TO_ANALYZE = '/project-to-analyze';
  it('Should say is not a sonarqube context', () => {
    //Assert
    expect(sonarqube.check()).to.be.false;
  });
  it('Should say it is a sonarqube context', () => {
    //Act
    process.chdir(__dirname + PROJECT_TO_ANALYZE);
    //Assert
    expect(sonarqube.check()).to.be.true;
  });
  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);
  });
});