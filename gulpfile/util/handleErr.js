/***********************************************************
 *  \#\#\# Gulp Helper - Error Handler \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var notify      = require('gulp-notify');

    var beep        = require('beepbeep');

    var cli         = require('../cli');
    var logger      = require('./logger');

    /*
        Export function directly.
     */
    module.exports = function(error) {

        logger.error('', error.code, error.message);

        // If it is in "release" mode, end the whole process
        // after certain error.
        if (!cli.inReleaseMode) {
            // Do "beep" sound
            beep(3, 400);

            var args = new Array(arguments.length);

            // Send error to notification center with gulp-notify
            notify.onError({
                title: '[Gulp Flow] "Release" Compile Error',
                message: '<%= error.message %>'
            }).apply(this, args);

            // Keep gulp from hanging on this task
            this.emit('end');
        } else {
            process.exit(1);
        }

    };

}());