/***********************************************************
 *  \#\#\# Gulp Helper - Logging \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gutil                   = require('gulp-util');

    var msgPrefix = '----| Gulp Flow |==[-';

    var exports = {
        info: info,
        warn: warn,
        error: error
    };

    module.exports = exports;

    //----------------------------------------------------------
    // Interface Functions
    //----------------------------------------------------------

    function info() {
        if (arguments.length < 2) {
            return;
        }

        var taskName = arguments[0];
        var msgArgs = new Array(arguments.length -1);
        var msg = '';
        for(var i = 0; i < msgArgs.length; ++i) {
            //i is always valid index in the arguments object
            msgArgs[i] = arguments[i+1];
            msg += msgArgs[i].toString() + ' ';
        }
        var output = _buildMsg(msgPrefix, taskName, msg);
        gutil.log(gutil.colors.green(output));
    }

    function warn() {
        if (arguments.length < 2) {
            return;
        }

        var taskName = arguments[0];
        var msgArgs = new Array(arguments.length -1);

        var msg = '';
        for(var i = 0; i < msgArgs.length; ++i) {
            //i is always valid index in the arguments object
            msgArgs[i] = arguments[i+1];
            msg += msgArgs[i].toString() + ' ';
        }
        var output = _buildMsg(msgPrefix, taskName, msg);
        gutil.log(gutil.colors.purple(output));
    }

    function error() {
        if (arguments.length < 2) {
            return;
        }

        var taskName = arguments[0];
        var msgArgs = new Array(arguments.length -1);

        var msg = '';
        for(var i = 0; i < msgArgs.length; ++i) {
            //i is always valid index in the arguments object
            msgArgs[i] = arguments[i+1];
            msg += msgArgs[i].toString() + ' ';
        }
        var output = _buildMsg(msgPrefix, taskName, msg);
        gutil.log(gutil.colors.red(output));
    }


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function _buildMsg(prefix, taskName, msg) {
        return prefix + taskName +'-]===> '+ msg;
    }

}());