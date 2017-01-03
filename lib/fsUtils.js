'use strict';

const fs = require('fs');

const exists = function(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (e) {
    if (e.syscall === 'stat') {
      return false;
    }
    throw e;
  }
};

const isFile = function(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (e) {
    return false;
  }
};

const isDirectory = function(file) {
  try {
    return fs.statSync(file).isDirectory();
  } catch (e) {
    return false;
  }
};

const readJSON = function(file) {
  let content = {};
  if (exists(file)) {
    try {
      content = JSON.parse(fs.readFileSync(file));
    }catch(e){
      console.log('Error detecting context: parsing', file, e);
    }
  }
  return content;
};

module.exports = {
  exists: exists,
  isFile: isFile,
  isDirectory: isDirectory,
  readJSON: readJSON
};
