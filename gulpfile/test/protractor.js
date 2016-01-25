'use strict';

var gulp                    = require('gulp');
var protractor              = require("gulp-protractor").protractor;
var webdriver_standalone    = require("gulp-protractor").webdriver_standalone;

var config                  = require('../config');
var handleErr               = require('../util/handleErr');

gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('protractor', ['webdriver_standalone'],  function(cb) {

    return gulp.src(config.test.protractorTargets)
        .pipe(protractor({
            configFile: config.test.protractor,
            args: [
                '--baseUrl', 'http://localhost:8100'
            ]
        }))
        .on('error', handleErr)
});