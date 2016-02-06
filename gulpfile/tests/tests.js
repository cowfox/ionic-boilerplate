/***********************************************************
 *  \#\#\# Gulp Task - Run Tests \#\#\#
 *
 * The task includes three steps:
 *
 * - Build the app
 * - Run JS lint
 * = Run Unit Test and E2E test
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    var runSequence             = require('run-sequence');

    // Gulp task name
    var taskName = "tests";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function(done) {
        runSequence(
            'clean',
            'vendor',
            'iconfont',
            'templates',
            [
                'fonts',
                'appicon',
                'images',
                'main-styles',
                'main-scripts'
            ],
            'index',
            'lint',
            'unit',
            'e2e',
            done);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());