/***********************************************************
 *  \#\#\# Gulp Tasks - Ionic CLI Related \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp            = require('gulp');
    var Server          = require('karma').Server;

    var config          = require('../config');

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task('unit', function(cb) {
        new Server({
            configFile: config.getBasePath(config.test.karmaConfigFilePath),
            singleRun: true
        }, cb).start();
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

}());