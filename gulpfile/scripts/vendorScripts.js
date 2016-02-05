/***********************************************************
 * ### Gulp task for "Vendor JS" files ###
 *
 * This **Ionic Boilerplate** is using **modularization** to Ionic+Angular project, and so do the vendor libs.
 * In other words, we need to **browserify** them as well.
 *
 * While using **Gulp** to help browserify, for each "libs" to be required, we need to load them from
 * **NPM** and it must be "CommonJS compatible". If some lib is not, we need to use `browserify-shim` to hellp
 * load them.
 *
 * Check this post to learn more about **how to browserify multiple bundles**.
 *
 * {@link http://www.5neo.be/browserify-multiple-bundles-with-gulp-on-angularjs-project}
 *
 ***********************************************************/


(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    //var rename                  = require("gulp-rename");
    var gulpif                  = require('gulp-if');
    //var concat                  = require('gulp-concat');

    var browserify              = require('browserify');
    var source                  = require('vinyl-source-stream');
    var buffer                  = require('vinyl-buffer');
    var streamify               = require('gulp-streamify');
    var uglify                  = require('gulp-uglify');
    var sourcemaps              = require('gulp-sourcemaps');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    var taskName = "vendor-scripts";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    /**
     * Gulp Task
     *
     * Process "vendor" CSS files.
     */
    gulp.task(taskName, function() {

        return browserifyVendorScriptsAsBundle(
            config.scripts.vendorScriptFileBrowserifyRequireBundle,
            config.scripts.vendorScriptFile,
            cli.solveTargetFolderPath(config.scripts.scriptFolderPath)
        );
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * When doing `browserify`, it helps bundle all "libs" as a single bundle outside the `app bundle`.
     *
     * @param requiredBundles The array of all "libs" that are to be bundled.
     * @param outputScriptFilename The filename of output file.
     * @param targetFolderPath The path of target folder that the output file is saved to.
     * @returns {*}
     */
    function browserifyVendorScriptsAsBundle(requiredBundles, outputScriptFilename, targetFolderPath) {

        // If in "Release" Mode, need to add ".min" to the output file.
        var newOutputScriptFilename = outputScriptFilename;
        var extraPart = "min";

        if (cli.inReleaseMode) {
            newOutputScriptFilename = pathBuilder.buildPathByAddingExtraPart(outputScriptFilename, extraPart);
        }

        var b = browserify({
            //basedir: config.getBasePath(),
            debug: cli.inReleaseMode
        });

        /*
            We use `b.require(file, opts)` to help declare these bundles so that they can be "externally" required by other
            bundles - in our case, it will be the `app bundle`.

            {@link https://github.com/substack/node-browserify#brequirefile-opts}
         */
        b.require(requiredBundles);

        return b.bundle()
            .pipe(source(newOutputScriptFilename))
            .pipe(gulpif(cli.inReleaseMode, buffer()))
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(cli.inReleaseMode, streamify(uglify({
                compress: { drop_console: true }
            }))))
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.write('./')))
            .pipe(gulp.dest(targetFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "VENDOR script Browserified and copied to", targetFolderPath, "with the file name:", newOutputScriptFilename);
            });
    }

}());