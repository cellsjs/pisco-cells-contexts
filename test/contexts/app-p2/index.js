'use strict';

/* global define, it, describe, before, beforeEach, after */
const path = require('path');
const appp2 = require('../../../contexts/app-p2');
const expect = require('chai').expect;
const rimraf = require('rimraf');
const fs = require('fs-extra');
const p = require('pisco-callback-to-promise');

const base = `${__dirname}/../tmp`;

const goToBaseDirectory = () => {
  process.chdir(base);
};

const createWorkingFolder = () => {
  return p.c2p(rimraf, base, {})
    .then(() => p.c2p(fs.mkdir, base))
    .then(goToBaseDirectory);
}

describe('Testing the cells app-p2 (Cells App with Polymer 2)', () => {
  const currentDirectory = process.cwd();
  beforeEach('Create the working folder', createWorkingFolder);
  it('Should say is not an polymer2 app of cells (blank directory)', () => {
    // Assert
    expect(appp2.check()).to.be.false;
  });
  it('Should say is not an polymer2 app of cells (no piscosour.json)', () => {
    // Given
    fs.mkdirSync(path.join(base, '.piscosour'));
    goToBaseDirectory();

    // Assert
    expect(appp2.check()).to.be.false;
  });
  it('Should say is not an polymer2 app of cells (piscosour.json blank)', () => {
    // Given
    fs.mkdirSync(path.join(base, '.piscosour'));
    fs.writeFileSync(path.join(base, '.piscosour/piscosour.json'), '{"context": "test"}');
    goToBaseDirectory();

    // Assert
    expect(appp2.check()).to.be.false;
  });
  it('Should say is not an polymer2 app of cells (piscosour.json with incorrect context)', () => {
    // Given
    fs.mkdirSync(path.join(base, '.piscosour'));
    fs.writeFileSync(path.join(base, '.piscosour/piscosour.json'), '{"context": "test"}');
    goToBaseDirectory();

    // Assert
    expect(appp2.check()).to.be.false;
  });
  it('Should say is not an polymer2 app of cells (piscosour.json with correct context)', () => {
    // Given
    fs.mkdirSync(path.join(base, '.piscosour'));
    fs.writeFileSync(path.join(base, '.piscosour/piscosour.json'), '{"context": "app-p2"}');
    goToBaseDirectory();
    expect(appp2.check()).to.be.true;
  });
  after('Should delete the tmp directory', (done) => {
    p.c2p(fs.remove, base)
      .then(() => done());
  });
});