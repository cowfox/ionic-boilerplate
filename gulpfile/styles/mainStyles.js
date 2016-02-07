/***********************************************************
 * ### Gulp task for "style" files ###
 *
 * The CSS files of project is done and managed by "SASS", in "app"'s folder.
 * When processing, a "single" main entry is provided (usually `main.scss`).
 *
 * All "Vendor's" CSS file is processed by another task.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var path                    = require('path');

    var preprocess              = require('gulp-preprocess');
    var gulpif                  = require('gulp-if');
    var sass                    = require('gulp-sass');
    var streamqueue             = require('streamqueue');
    var sourcemaps              = require('gulp-sourcemaps');
    var autoprefixer            = require('gulp-autoprefixer');
    var stripCssComments        = require('gulp-strip-css-comments');
    var concat                  = require('gulp-concat');
    //var rev                     = require('gulp-rev');
    // @deprecated
    //var minifyCss               = require('gulp-minify-css');
    var cssnano                 = require('gulp-cssnano');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    //var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "main-styles";

    //----------------------------------------------------------
    // GUlp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        return processStyleFiles(
            config.getAppPath(path.join(config.styles.styleFolderPath, config.styles.mainSassFile)),
            config.styles.mainCssFIle,
            cli.solveTargetFolderPath(config.styles.styleFolderPath)
        );
    });



    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * Process the "style" files (Sass) based on "diff. running mode".
     *
     * @param inputMainSassFilePaths The path of "input" main Sass entry file.
     * @param outputCssFilename The filename of target "output" CSS file to be generated.
     * @param targetFolderPath The path of the target CSS file.
     * @returns {*}
     */
    function processStyleFiles(inputMainSassFilePaths, outputCssFilename, targetFolderPath) {

        // Decide if need to "compress" the styles file.
        var sassOptions = cli.requiredBuild ? { style: 'compressed' } : { style: 'expanded' };

        var sassStream = gulp.src(inputMainSassFilePaths)
            .pipe(preprocess({
                context: {
                    NODE_ENV: cli.getEnvInfo()
                }
            }))
            .pipe(sass(sassOptions))
            .on('error', handleErr);

        // TODO Can use `streamqueue` if need to support more "main Sass entry" file.

        return streamqueue({ objectMode: true }, sassStream)
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.init()))// Only need it when in "release" mode.
            .pipe(autoprefixer(config.styles.autoprefixerOptions))
            .pipe(gulpif(cli.inReleaseMode, cssnano()))
            .pipe(concat(outputCssFilename))
            .pipe(gulpif(cli.inReleaseMode, stripCssComments()))// Only need it when in "release" mode.
            //.pipe(gulpif(cli.inReleaseMode, rev()))// Only need it when in "release" mode.
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.write('.'))) // Only need it when in "release" mode.
            .pipe(gulp.dest(targetFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "MAIN styles copied to the folder:", targetFolderPath, "with the \"MAIN\" source file:", inputMainSassFilePaths);
            });
    }

}());