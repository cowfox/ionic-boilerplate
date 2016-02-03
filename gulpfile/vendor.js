/***********************************************************
 *  \#\#\# Gulp Task for Processing Vendor's Styles and Scripts \#\#\#
 *
 * Normally, vendor's style and script files should not be changed frequently.
 * So we have a separate **task queue**.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');

    var runSequence             = require('run-sequence');

    var config                  = require('./config');
    var cli                     = require('./cli');
    var handleErr               = require('./util/handleErr');
    var pathBuilder             = require('./util/pathBuilder');

    // Gulp task name
    var taskName = "vendor";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function(done) {
        runSequence(
            [
                'vendor-styles',
                'vendor-scripts'
            ],
            done);
    });


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());