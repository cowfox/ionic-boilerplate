/***********************************************************
 *  \#\#\# Gulp Task for "Environment Variables" \#\#\#
 *
 * The task sets `process.env` based on the current `Environment` settings.
 *
 * Use `gulp --env=dev|prod` to set `Environment`.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');

    var env                     = require('gulp-env');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "set-env";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        // Set **global** env variables, including `NODE_ENV`
        var nodeEnv = cli.getEnvInfo();
        var globalEnvVariable = config.env.global;
        globalEnvVariable.NODE_ENV = nodeEnv;

        var specificEnvVariables = config.env[nodeEnv];

        _updateProcessEnv(globalEnvVariable);
        _updateProcessEnv(specificEnvVariables);

        logger.info(taskName,
            "Set 'Environment Variables' for:", nodeEnv);
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function _updateProcessEnv(envVariableObj) {

        if (typeof envVariableObj !== 'object') {
            logger.error(taskName,
            "Environment Variables in Gulp 'config.js' file is not an object. ",
            "\n Please double check!")
            return;
        }
        // Set process.env.
        env({
            vars: envVariableObj
        });

        return;
    }

}());