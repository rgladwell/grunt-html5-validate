/*
 * Copyright (c) 2016 Ricardo Gladwell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('html5validate', 'Analyse HTML5 for errors and common problems.', function () {
    var html5Lint = require( 'html5-lint' );
    var done = this.async();

    grunt.util.async.forEach(this.filesSrc, function(filepath, cb) {
      var html = grunt.file.read(filepath);

      html5Lint(html, function(err, results) {
        results.messages.forEach(function(msg) {
          grunt.log.error('HTML5 Lint [%s:%s] [%s]: %s', filepath, msg.lastLine, msg.type, msg.message);
        });

        if(results.messages.length === 0) {
          grunt.log.ok('No HTML5 errors in file=[%s]', filepath);
        }

        cb(results.messages.length > 0);
      });
    }, function(error) {
      done(!error);
    });

  });

};
