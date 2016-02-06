/***********************************************************
 *  \#\#\# Gulp Tasks - Unit Test \#\#\#
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

        // Write in this way can get rid of "Error: 1" error of Gulp when Karma gets "filed" test.
        new Server({
            configFile: config.getBasePath(config.tests.karmaConfigFilePath),
            singleRun: true
        }, function() {
            cb();
        }).start();
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

}());