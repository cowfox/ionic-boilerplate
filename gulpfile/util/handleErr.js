/***********************************************************
 *  \#\#\# Gulp Helper - Error Handler \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp        = require( 'gulp' )
    var gutil       = require('gulp-util')
    var notify      = require('gulp-notify');

    var cli         = require('../cli');
    var logger      = require('./logger');

    /*
        Export function directly.
     */
    module.exports = function(error) {

        logger.error('errorHandler', error.toString());

        // If it is in "release" mode, end the whole process
        // after certain error.
        if (!cli.inReleaseMode) {

            var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

            // Send error to notification center with gulp-notify
            notify.onError({
                title: '[Gulp Flow] Error: [' + error.plugin + '] ' + lineNumber,
                message:  '<%= error.message %>'
            });
            // Seems that it need `write()` to work, but not sure which pacakge to load.
            //}).write(error);

            gutil.beep();

            // Keep gulp from hanging on this task
            this.emit('end');
        } else {
            process.exit(1);
        }

    };

}());