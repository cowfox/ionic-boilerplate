/***********************************************************
 *  \#\#\# Gulp Task for "Auto Serve" \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var fs                      = require('fs');
    var path                    = require('path');


    var express                 = require('express');
    var connectLr               = require('connect-livereload');
    var open                    = require('open');


    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Gulp task name
    var taskName = "serve";

    //
    var server = null;

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    // start local express server
    gulp.task(taskName, function() {

        var port = config.serve.port;

        server = express()
            .use(!cli.requiredBuild ? connectLr() : function(){})
            .use(express.static(cli.solveTargetFolderPath()))
            .listen(port);
        open('http://localhost:' + port + '/');
        logger.info(taskName,
            "Local server is running:", 'http://localhost:' + port + '/');
    });

    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());