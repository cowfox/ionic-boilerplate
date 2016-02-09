/***********************************************************
 *  \#\#\# Gulp Task for Template Copying \#\#\#
 *
 * You can choose if use `templateCache`.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    var gulpif                  = require('gulp-if');
    //var fs                      = require('fs');
    //var path                    = require('path');
    var changed                 = require('gulp-changed');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    var templateCache           = require('gulp-angular-templatecache');

    // Gulp task name
    var taskName = "templates";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function () {

        var inputTemplatesFilePaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(),
            config.htmls.templatesFilePaths);

        var outputTemplatesFolderPath = '';
        if (config.htmls.templatesCacheUsed) {
            // Use `templateCache`.
            // First, the generated `JS` file will be copied to the scripts folder under `app` folder.
            // Then, `scripts` task will treat it as a normal JS file.
            outputTemplatesFolderPath = config.getAppPath(config.scripts.scriptFolderPath);
        } else {
            outputTemplatesFolderPath = cli.solveTargetFolderPath(config.htmls.templatesFolderPath);
        }

        return gulp.src(inputTemplatesFilePaths)
            .pipe(gulpif(!config.htmls.templatesCacheUsed, changed(outputTemplatesFolderPath)))
            .pipe(gulpif(config.htmls.templatesCacheUsed,
                templateCache(config.htmls.templatesCacheFilename, config.htmls.templatesCacheOptions)))
            .pipe(gulp.dest(outputTemplatesFolderPath))
            .on('error', handleErr)
            .on('end', function() {
                logger.info(taskName,
                    "templateCache used:", config.htmls.templatesCacheUsed,
                    "Template copied to the folder:", outputTemplatesFolderPath, "with the source files:", inputTemplatesFilePaths);
            });
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());