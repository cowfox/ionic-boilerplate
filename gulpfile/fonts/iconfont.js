/***********************************************************
 *  \#\#\# Gulp task for generate **Icon Fonts** \#\#\#
 *
 * Basically, it looks all ".svg" files under your `iconfont`folder.
 *
 * - Use `gulp-iconfont` to help generate iconfont files.
 * - Use `gulp-iconfont-css` to help generate corresponding CSS file.
 *
 * NOTE: Go to `config.js` files to configure the **options** for both
 * `gulp-iconfont` and `gulp-iconfont-css`.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');
    var iconfont                = require('gulp-iconfont');
    var iconfontCss             = require('gulp-iconfont-css');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    var taskName = "iconfont";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    var iconfontPath = config.getAppPath(config.fonts.iconfontFilePath);


    gulp.task(taskName, function(){
        return gulp.src(iconfontPath,
            {
                buffer: false
            })
            .pipe(iconfont(config.fonts.iconfontOptions))
            .pipe(iconfontCss(config.fonts.iconfontCssOptions))
            .pipe(gulp.dest(cli.solveTargetFolderPath(config.fonts.fontFolderPath)))
            .on('error', handleErr);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

}());