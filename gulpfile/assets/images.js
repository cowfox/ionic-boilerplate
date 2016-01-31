/***********************************************************
 *  \#\#\# Gulp Task - Images Copying \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');
    var changed                 = require('gulp-changed');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task('images', function() {
        var inputImagesFilePaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.assets.imageFolderPath),
            config.assets.imageFilePaths);

        var outputImagesFolderPath = cli.solveTargetFolderPath(config.assets.imageFolderPath);

        gutil.log("---> Image copying to the folder: ", outputImagesFolderPath, "with the source files:", inputImagesFilePaths);

        return gulp.src(inputImagesFilePaths)
            .pipe(changed(outputImagesFolderPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputImagesFolderPath))
            .on('error', handleErr);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());