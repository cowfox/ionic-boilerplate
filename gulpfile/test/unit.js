'use strict';

var gulp            = require('gulp');
var Server          = require('karma').Server;

var config          = require('../config');

gulp.task('unit', function(cb) {

    new Server({
        configFile: __dirname + config.test.karma,
        singleRun: true
    }, cb).start();

});