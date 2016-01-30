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

    var jshint                  = require('gulp-jshint');

    var config                  = require('../config');
    var pathBuilder             = require('../util/pathBuilder');

    var taskName = "lint";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    /**
     * Gulp Task
     *
     * Code Screening.
     */
    gulp.task(taskName, function() {

        // Check if need to also lint Gulp Tasks files.
        var lintFilePaths = pathBuilder.buildPathArrayFromBase(config.getAppPath(), config.scripts.lintFilePaths);
        if (config.scripts.needLintGulpTaskFiles) {
            lintFilePaths.push(config.getBasePath(config.scripts.gulpFilePath));
        }

        return lintScriptFiles(lintFilePaths);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * Do code screening based on given file paths.
     *
     * @param scriptFilePaths The path array to the files to be screened.
     * @returns {*}
     */
    function lintScriptFiles(scriptFilePaths) {

        if (config.scripts.useLintHTMLReporter) {
            var lintReporter = require('gulp-jshint-html-reporter');
            var outputPath = config.getBasePath(config.scripts.lintHTMLOutputFilename);

            gutil.log("JSHint Report outputs to", outputPath);
            return gulp.src(scriptFilePaths)
                .pipe(jshint())
                .pipe(jshint.reporter(lintReporter, {
                    filename: outputPath,
                    createMissingFolders : false
                }));
        } else {
            var lintReporter = require('jshint-stylish');
            return gulp.src(scriptFilePaths)
                .pipe(jshint())
                .pipe(jshint.reporter(lintReporter));
        }
    }

}());