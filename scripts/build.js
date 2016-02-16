#!/usr/bin/env node

var jade = require('jade');
var fs = require('fs.extra');
var path = require('path');

function build() {
  var slidesPath = path.join(__dirname, '../src/slides.md');
  var slides = fs.readFileSync(slidesPath);

  var options = {};
  var fn = jade.compileFile(path.join(__dirname, '../src/index.jade'), options);

  var html = fn({slides})

  fs.rmrf(path.join(__dirname, '../build'), () => {
    fs.mkdirpSync(path.join(__dirname, '../build/public'))
    fs.writeFileSync(path.join(__dirname, '../build/index.html'), html)
    fs.copyRecursive(path.join(__dirname, '../src/public'), path.join(__dirname, '../build/public'), () => {})
  })
}

module.exports = build;