'use strict';

var gulp = require('gulp');
var del = require('del');

var config = require('../config');
var cli = require('../cli');

// clean target dir
gulp.task('clean', function(done) {
    del([cli.targetDir], done);
});