/***********************************************************
 * ### Gulp task for "main script" files ###
 *
 * Under `app` folder, all app scripts are organized by `modules`.
 * In order to make these module link, doing **browserify** to these scripts is **REQUIRED**.
 *
 * By default, all app scripts will be bundle as **ONE** single bundle, and also add **Vendor** bundle
 * as `external` bundle so that app bundle does not need to include those libs.
 *
 * If you are looking for **having the app scripts to be multiple bundles**, you should know
 * the concepts of **Browserify/CommonJS** before you start to modify this script. :)
 *
 * Check this post to learn more about **how to browserify multiple bundles**.
 *
 * {@link http://www.5neo.be/browserify-multiple-bundles-with-gulp-on-angularjs-project}
 *
 ***********************************************************/


(function () {
    "use strict";

    var gulp                = require('gulp');
    var gutil               = require('gulp-util');
    var gulpif              = require('gulp-if');

    var browserify          = require('browserify');
    var ngAnnotate          = require('browserify-ngannotate');
    var brfs                = require('brfs');
    var bulkify             = require('bulkify');

    var streamify           = require('gulp-streamify');
    var uglify              = require('gulp-uglify');
    var sourcemaps          = require('gulp-sourcemaps');
    var source              = require('vinyl-source-stream');
    var buffer              = require('vinyl-buffer');

    var glob                = require('glob-all');
    var es                  = require('event-stream');
    var rename              = require("gulp-rename");

    var config              = require('../config');
    var cli                 = require('../cli');
    var logger              = require('../util/logger');
    var handleErr           = require('../util/handleErr');
    var pathBuilder         = require('../util/pathBuilder');

    var taskName = "main-scripts";

    var browserifyTransforms = [
        { 'name':ngAnnotate, 'options': {}},
        /*
            Since `Ionic Boilerplate` is using `bulk` to do **multi-require**, here we need a special
            "transform" - `bulkify`. And to make `bulkify` working, `brfs` is REQUIRED.
         */
        { 'name':'brfs', 'options': {}},
        { 'name':'bulkify', 'options': {}}
    ];

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        return browserifyMainScriptsAsBundle(
            config.scripts.vendorScriptFileBrowserifyRequireBundle,
            config.scripts.mainScriptFilePaths,
            config.scripts.mainScriptFile,
            cli.solveTargetFolderPath(config.scripts.scriptFolderPath)
        );

    });


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function browserifyMainScriptsAsBundle(requiredVendorBundles, mainEntries, outputScriptFilename, targetFolderPath) {

        // If in "Release" Mode, need to add ".min" to the output file.
        var newOutputScriptFilename = outputScriptFilename;
        var extraPart = "min";

        if (cli.inReleaseMode) {
            newOutputScriptFilename = pathBuilder.buildPathByAddingExtraPart(outputScriptFilename, extraPart);
        }

        var b = browserify({
            entries: mainEntries,
            basedir: config.getAppPath(config.scripts.scriptFolderPath),
            debug: cli.inReleaseMode
        });

        browserifyTransforms.forEach(function(transform) {
            /*
             Use `b.transform(tr, opts={})` to apply each `transform func`.

             {@link https://github.com/substack/node-browserify#btransformtr-opts}
             */
            b.transform(transform.name, transform.options);
        });

        /*
         Use `b.exclude(file)` to link to the "external" bundles so that they are not included into this bundle
          bu can still be required "externally" - in our case, it will be the `vendor bundle`.

         {@link https://github.com/substack/node-browserify#bexcludefile}
         */
        b.external(requiredVendorBundles);

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
                    "MAIN script Browserified and copied to", targetFolderPath, "with the file name:", newOutputScriptFilename);
            });
    }

}());