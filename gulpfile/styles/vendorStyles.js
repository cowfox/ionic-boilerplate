/***********************************************************
 * ### Gulp task for "Vendor CSS" files ###
 *
 * For "Vendor's" CSS files, we simply **concat** them and output as an one single file.
 *
 * Depending on **env.**, need to determine if need to load `.min.css` files.
 *
 * NOTE: Normally, each vendor CSS should have ".min" version. If not, ...... just do not use it.... :)
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');

    var rename                  = require("gulp-rename");
    var gulpif                  = require('gulp-if');
    var concat                  = require('gulp-concat');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');


    var taskName = "vendor-styles";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    /**
     * Gulp Task
     *
     * Process "vendor" CSS files.
     */
    gulp.task(taskName, function() {

        return processCssFiles(
            pathBuilder.buildPathArrayFromBase(config.getVendorPath(), config.styles.vendorCssFilePaths),
            config.styles.vendorCssFile,
            cli.solveTargetFolderPath(config.styles.styleFolderPath)
        );
    });


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     *
     * @param inputCssFilePaths The path array of source files.
     * @param outputCssFilename The filename of output file.
     * @param targetFolderPath The path of target folder that the output file is saved to.
     * @returns {*}
     */
    function processCssFiles(inputCssFilePaths, outputCssFilename, targetFolderPath) {

        // If in "Release" Mode, need to add ".min" to each file, including all source "vendor" files and output file.
        var newInputCssFilePaths = inputCssFilePaths;
        var newOutputCssFilename = outputCssFilename;
        var extraPart = "min";

        if (cli.inReleaseMode) {
            newInputCssFilePaths = pathBuilder.buildPathArrayByAddingExtraPart(inputCssFilePaths, extraPart);
            newOutputCssFilename = pathBuilder.buildPathByAddingExtraPart(outputCssFilename, extraPart);
        }

        return gulp.src(newInputCssFilePaths)
            .pipe(concat(newOutputCssFilename))
            .pipe(gulp.dest(targetFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "VENDOR styles copied to the folder:", targetFolderPath, "with the source files:", newInputCssFilePaths);
            });
    }

}());