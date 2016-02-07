/***********************************************************
 *  \#\#\# Gulp Tasks - Ionic CLI Related \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    var shell                   = require('gulp-shell');

    //var config                  = require('../config');
    var cli                     = require('../cli');
    //var logger                  = require('../util/logger');
    //var handleErr               = require('../util/handleErr');
    //var pathBuilder             = require('../util/pathBuilder');
    //var fileOP                  = require('../util/fileOP');


    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    // ionic platform
    gulp.task('add-ios', ['set-env'], shell.task([
        'ionic platform add ios'
    ]));

    gulp.task('remove-ios', ['set-env'], shell.task([
        'ionic platform remove ios'
    ]));

    gulp.task('add-android', ['set-env'], shell.task([
        'ionic platform add android'
    ]));

    gulp.task('remove-android', ['set-env'], shell.task([
        'ionic platform remove android'
    ]));

    // ionic state reset
    gulp.task('reset', shell.task([
        'ionic state reset'
    ]));

    // ionic emulate [platform] -l -c
    gulp.task('ionic-emulate', shell.task([
        'ionic emulate ' + cli.emulatePlatform + ' --livereload --consolelogs'
    ]));

    // ionic emulate [platform]
    gulp.task('ionic-run', shell.task([
        'ionic run ' + cli.runPlatform + ' --device'
    ]));

    // ionic resources
    gulp.task('icon', shell.task([
        'ionic resources --icons'
    ]));
    gulp.task('splash', shell.task([
        'ionic resources --splash'
    ]));
    gulp.task('resources', shell.task([
        'ionic resources'
    ]));

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());