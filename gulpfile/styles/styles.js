/***********************************************************
 * ### Gulp task for "style" files ###
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var fs                      = require('fs');
    var path                    = require('path');

    var gulpif                  = require('gulp-if');
    var sass                    = require('gulp-sass');
    var streamqueue             = require('streamqueue');
    var sourcemaps              = require('gulp-sourcemaps');
    var autoprefixer            = require('gulp-autoprefixer');
    var stripCssComments        = require('gulp-strip-css-comments');
    var concat                  = require('gulp-concat');
    var rev                     = require('gulp-rev');
    var minifyCss               = require('gulp-minify-css');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var handleErr               = require('../util/handleErr');

    // Gulp task name
    var taskName = "styles";

    //----------------------------------------------------------
    // GUlp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        console.log("solveTargetFolderPath:", config.styles.styleFolderPath, cli.solveTargetFolderPath(config.styles.styleFolderPath));
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
     * Process the "style" files based on "diff. running mode".
     *
     * @param mainSassFilePath The path of main Sass entry file.
     * @param mainCssFilename The filename of target CSS file to be generated.
     * @param targetFolderPath The path of the target CSS file.
     * @returns {*}
     */
    function processStyleFiles(mainSassFilePath, mainCssFilename, targetFolderPath) {

        // Decide if need to "compress" the styles file.
        var sassOptions = cli.inBuild ? { style: 'compressed' } : { style: 'expanded' };

        var sassStream = gulp.src(mainSassFilePath)
            .pipe(sass(sassOptions))
            .on('error', handleErr);

        // TODO Can use `streamqueue` if need to support more "main Sass entry" file.

        return streamqueue({ objectMode: true }, sassStream)
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.init()))// Only need it when in "release" mode.
            .pipe(autoprefixer(config.styles.autoprefixerOptions))
            .pipe(gulpif(cli.inReleaseMode, minifyCss(config.styles.minifyCssOptions)))
            .pipe(concat(mainCssFilename))
            .pipe(gulpif(cli.inReleaseMode, stripCssComments()))// Only need it when in "release" mode.
            .pipe(gulpif(cli.inReleaseMode, rev()))// Only need it when in "release" mode.
            .pipe(gulpif(cli.inReleaseMode, sourcemaps.write('.'))) // Only need it when in "release" mode.
            .pipe(gulp.dest(targetFolderPath))
            .on('error', handleErr);
    }

}());