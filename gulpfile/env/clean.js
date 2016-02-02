/***********************************************************
 *  \#\#\# Gulp task for Cleaning \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');

    var del                     = require('del');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "clean";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {
        del([
            cli.solveTargetFolderPath()
        ]);
        logger.info(taskName, "Clean Paths:", [cli.solveTargetFolderPath()])
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

}());

