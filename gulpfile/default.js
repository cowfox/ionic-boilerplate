/***********************************************************
 *  \#\#\# Gulp task for Default Task \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');

    var runSequence             = require('run-sequence');

    var config                  = require('./config');
    var cli                     = require('./cli');
    var handleErr               = require('./util/handleErr');
    var pathBuilder             = require('./util/pathBuilder');



    // Gulp task name
    var taskName = "default";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    // no-op = empty function
    gulp.task('noop', function() {});

    gulp.task(taskName, function(done) {
        runSequence(
            'clean',
            'vendor',
            'iconfont',
            'templates',
            [
                'fonts',
                'appicon',
                'images',
                'main-styles',
                'main-scripts'
            ],
            'index',
            cli.requiredBuild ? 'noop' : 'serve',
            cli.requiredBuild ? 'noop' : 'watch',
            //emulate ? ['ionic:emulate', 'watchers'] : 'noop',
            //run ? 'ionic:run' : 'noop',
            done);
    });



    //// Ensure process ends after all Gulp tasks are finished
    //gulp.on('stop', function () {
    //    if ( !global.isWatching ) {
    //        process.nextTick(function () {
    //            process.exit(0);
    //        });
    //    }
    //});

}());