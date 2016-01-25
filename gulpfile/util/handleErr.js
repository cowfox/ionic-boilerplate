'use strict';

var gulp    = require('gulp');
var notify  = require('gulp-notify');

var config = require('../config');

module.exports = function(error) {

    if(!config.inProd) {
        // In `development` mode

        var args = Array.prototype.slice.call(arguments);

        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');

    } else {
        // In `production` mode.
        // Log the error and stop the process to prevent broken code from building.
        console.log(error);
        process.exit(1);
    }

};