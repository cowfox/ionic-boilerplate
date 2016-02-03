/***********************************************************
 *  \#\#\# Gulp Task for `index.html` Processing \#\#\#
 *
 * It is mainly about injecting `stylesheet` and `script` tags.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var gulpif                  = require('gulp-if');
    var fs                      = require('fs');
    var path                    = require('path');
    var inject                  = require('gulp-inject');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "index";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    // inject the files in index.html
    gulp.task(taskName, function() {

        var indexFilePath = config.getAppPath(config.htmls.indexFile);
        var outputIndexFileFolderPath = cli.solveTargetFolderPath();

        var vendorCssFilePaths = path.join(
            cli.solveTargetFolderPath(config.styles.styleFolderPath),
            config.htmls.injectVendorCssFilename);
        var mainCssFilePaths = path.join(
            cli.solveTargetFolderPath(config.styles.styleFolderPath),
            config.htmls.injectMainCssFilename);

        var vendorScriptFilePaths = path.join(
            cli.solveTargetFolderPath(config.scripts.scriptFolderPath),
            config.htmls.injectVendorScriptFilename);
        var mainScriptFilePaths = path.join(
            cli.solveTargetFolderPath(config.scripts.scriptFolderPath),
            config.htmls.injectMainScriptFilename);

        return gulp.src(indexFilePath)
            // inject CSS
            .pipe(injectFilePath(gulp.src(vendorCssFilePaths, {
                cwd: outputIndexFileFolderPath
            }), config.htmls.injectVendorCssTag))
            .pipe(injectFilePath(gulp.src(mainCssFilePaths, {
                cwd: outputIndexFileFolderPath
            }), config.htmls.injectMainCssTag))

            // inject vendor.js
            .pipe(injectFilePath(gulp.src(vendorScriptFilePaths, {
                cwd: outputIndexFileFolderPath
            }), config.htmls.injectVendorScriptTag))
            .pipe(injectFilePath(gulp.src(mainScriptFilePaths, {
                cwd: outputIndexFileFolderPath
            }), config.htmls.injectMainScriptTag))

            .pipe(gulp.dest(outputIndexFileFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "index.html gets updated.");
            });
    });



    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function injectFilePath(inputFilPaths, placeholder) {
        return inject(inputFilPaths, {
            starttag: '<!-- inject:' + placeholder + ':{{ext}} -->',
            read: false,
            addRootSlash: false
        });
    }

}());