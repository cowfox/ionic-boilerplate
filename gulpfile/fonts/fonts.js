/***********************************************************
 *  \#\#\# Gulp task for Fonts Copying \#\#\#
 *
 * The copying include both fonts inside `app` folder and the fonts from `vendors`.
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
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "fonts";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        var inputFontFilePaths = pathBuilder.buildPathArrayFromBase(config.getVendorPath(), config.fonts.vendorFontFilePaths)
            .concat(pathBuilder.buildPathArrayFromBase(config.getAppPath(config.fonts.fontFolderPath), config.fonts.mainFontFilePaths));

        var outputFontFolderPath =  cli.solveTargetFolderPath(config.fonts.fontFolderPath);

        return gulp.src(inputFontFilePaths)
            .pipe(changed(outputFontFolderPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputFontFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "Fonts copied to the folder:", outputFontFolderPath, "with the source files:", inputFontFilePaths);
            });
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());