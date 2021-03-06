/***********************************************************
 *  \#\#\# Gulp Task - Images Copying \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    var gulpif                  = require('gulp-if');
    //var fs                      = require('fs');
    //var path                    = require('path');
    var changed                 = require('gulp-changed');
    var imagemin                = require('gulp-imagemin');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "images";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {
        var inputImagesFilePaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.assets.imageFolderPath),
            config.assets.imageFilePaths);

        var outputImagesFolderPath = cli.solveTargetFolderPath(config.assets.imageFolderPath);

        return gulp.src(inputImagesFilePaths)
            .pipe(changed(outputImagesFolderPath)) // Ignore unchanged files
            .pipe(gulpif(cli.inReleaseMode, imagemin())) // Optimize
            .pipe(gulp.dest(outputImagesFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "Images copied to the folder:", outputImagesFolderPath, "with the source files:", inputImagesFilePaths);
            });
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());