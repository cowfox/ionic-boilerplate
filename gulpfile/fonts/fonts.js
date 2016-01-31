/***********************************************************
 *  \#\#\# Gulp task for Fonts Copying \#\#\#
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
    // @cmtsection
    //----------------------------------------------------------

    var inputFontFilePaths = pathBuilder.buildPathArrayFromBase(config.getVendorPath(), config.fonts.vendorFontFilePaths)
        .concat(pathBuilder.buildPathArrayFromBase(config.getAppPath(config.fonts.fontFolderPath), config.fonts.mainFontFilePath));

    gutil.log("---> Fonts Copying from the folders: ", inputFontFilePaths);

    gulp.task('fonts', function() {
        return gulp.src(inputFontFilePaths)
            .pipe(changed(cli.solveTargetFolderPath(config.fonts.fontFolderPath))) // Ignore unchanged files
            .pipe(gulp.dest(cli.solveTargetFolderPath(config.fonts.fontFolderPath)))
            .on('error', handleErr);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());