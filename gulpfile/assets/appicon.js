/***********************************************************
 *  \#\#\# Gulp task for App Icon and App Splash \#\#\#
 *
 * In `Ionic` project, it usually uses `ionic resources` cmd to help generate all app icons and app splash.
 * To utilize `ionic resources` cmd, the resources folder (usually `./resources`) needs to have the **source files**
 * for app icon and splash images.
 *
 * The source file can be `icon.png`, `icon.psd` or `icon.ai` for app icon
 * and `splash.png`, `splash.psd` or `splash.ai` for app splash.
 *
 * In the `app` folder, the `icons` folder is used to contain these files. And the task itself is just to copy then to
 * the `resources` folder (usually `./resources`).
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

    // Gulp task name
    var taskName = "appicon";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {
        var inputAppiconFilePaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.assets.appiconFolderPath),
            config.assets.appiconFilePaths);

        var outputAppiconFolderPath = config.getBasePath(config.assets.appiconTargetFolderPath);

        gutil.log("---> Icons copying to the folder: ", outputAppiconFolder, "with the source files:", inputAppiconFilePaths);

        return gulp.src(inputAppiconFilePaths)
            .pipe(changed(outputAppiconFolderPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputAppiconFolderPath))
            .on('error', handleErr);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

}());