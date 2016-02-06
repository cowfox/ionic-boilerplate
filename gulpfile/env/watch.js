/***********************************************************
 *  \#\#\# Gulp task for "Watch" Task \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    var livereload              = require('gulp-livereload');

    var watch                   = require('gulp-watch');
    var sequence                = require('gulp-watch-sequence');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');


    // Gulp task name
    var taskName = "watch";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------


    gulp.task(taskName, function() {

        logger.info(taskName,
            "Watch Mode is on!", 'Enjoy your codeing life~~ :)');

        livereload.listen();

        var queue = sequence(300);

        // Iconfont
        watch(config.getAppPath(config.fonts.iconfontFilePath), {
            name      : 'Iconfont',
            emitOnGlob: false
        }, queue.getHandler('iconfont', 'fonts'));

        // Fonts
        var FontsWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.fonts.fontFolderPath),
            config.fonts.mainFontFilePaths);
        watch(FontsWatchPaths, {
            name      : 'Fonts',
            emitOnGlob: false
        }, queue.getHandler('fonts'));

        // Appicon
        var appiconWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.assets.appiconFolderPath),
            config.assets.appiconFilePaths);
        watch(appiconWatchPaths, {
            name      : 'Appicon',
            emitOnGlob: false
        }, queue.getHandler('appicon'));

        // Images
        var imageWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.assets.imageFolderPath),
            config.assets.imageFilePaths);
        watch(imageWatchPaths, {
            name      : 'Appicon',
            emitOnGlob: false
        }, queue.getHandler('appicon'));

        // Main Styles
        var mainStyleWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.styles.styleFolderPath),
            config.styles.styleFilePaths);
        watch(mainStyleWatchPaths, {
            name      : 'MainStyles',
            emitOnGlob: false
        }, queue.getHandler('main-styles'));

        // Templates
        var templateWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(),
            config.htmls.templatesFilePaths);
        watch(templateWatchPaths, {
            name      : 'Templates',
            emitOnGlob: false
        }, queue.getHandler('templates', 'main-scripts'));

        // Main Scripts
        var mainScriptWatchPaths = pathBuilder.buildPathArrayFromBase(
            config.getAppPath(config.scripts.scriptFolderPath),
            ['./**/*.js']);
        watch(mainScriptWatchPaths, {
            name      : 'MainScript',
            emitOnGlob: false
        }, queue.getHandler('main-scripts'));

        // index.html
        var indexWatchPaths = config.getAppPath(config.htmls.indexFile);
        watch(indexWatchPaths, {
            name      : 'Index',
            emitOnGlob: false
        }, queue.getHandler('index'));

        gulp.watch(cli.solveTargetFolderPath() + '/**')
            .on('change', livereload.changed)
            .on('error', handleErr);
    });
}());