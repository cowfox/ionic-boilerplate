/***********************************************************
 *  \#\#\# Gulp Tasks - End-to-End (e2e) Test \#\#\#
 *
 * It is based on `Protractor` - the **best** choice for AngularJS.
 *
 * For more info about `Protractor`, check its website - https://angular.github.io/protractor/#/api
 *
 * @discussion If running `selenium-server` gets "port" conflict, try to use the following URL to shutdown it.
 * http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer
 *
 ***********************************************************/

(function () {
    "use strict";


    var gulp                    = require('gulp');

    var path                    = require('path');

    //var protractor              = require("protractor").protractor;
    //var spawn                   = require('child_process').spawn;
    var protractor              = require("gulp-protractor").protractor;
    var webdriver_standalone    = require("gulp-protractor").webdriver_standalone;
    var express                 = require('express');
    var connectLr               = require('connect-livereload');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');

    // Express Server
    var server = null;

    gulp.task('webdriver', webdriver_standalone);

    gulp.task('e2e', function(cb) {

        // First, start the local **Express** server to host the app.
        var port = config.serve.port;
        server = express()
            .use(!cli.requiredBuild ? connectLr() : function(){})
            .use(express.static(cli.solveTargetFolderPath()))
            .listen(port);

        // Do **Protractor** test
        return gulp.src(pathBuilder.buildPathArrayFromBase(config.getBasePath(), config.tests.protractorTargetFilePaths))
            .pipe(protractor({
                configFile: config.getBasePath(config.tests.protractorConfigFilePath)
            }))
            .on('error', handleErr)
            .on('end', function(){
                server.close();
            });
    });


    // Running Protractor without `gulp-protractor` plugin
    // https://www.npmjs.com/package/gulp-protractor
    //
    //gulp.task('e2e', function(){
    //
    //    return new Promise(function(resolve, reject){
    //        /**
    //         * Steps:
    //         * 1. webdriver-manager update: to make sure the standalone
    //         *      selenium driver is downloaded to be used
    //         * 2. webdriver-manager start: to start selenium driver
    //         * 3. run protractor test cases
    //         */
    //        var webdriverBinary = _getProtractorBinary('webdriver-manager');
    //
    //        var webdriverUpdate = spawn('node', [webdriverBinary, 'update'], {stdio: 'inherit'})
    //            .once('close', function(){
    //                var webdriverProcess = spawn('node', [webdriverBinary, 'start'],  {stdio: 'inherit'});
    //
    //                setTimeout(function(){
    //                    var stream = gulp.src(pathBuilder.buildPathArrayFromBase(config.getBasePath(), config.tests.protractorTargetFilePaths))
    //                        .pipe(protractor({
    //                            configFile: config.tests.protractorConfigFilePath
    //                        }))
    //                        .on('end', function(){
    //                            webdriverProcess.kill();
    //                            webdriverUpdate.kill();
    //                            server.close();
    //                        });
    //
    //                    resolve(stream);
    //                }, 5000);
    //            });
    //    });
    //});


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /*
     * This gets the path to protractor folder under node_modules
     */
    //function _getProtractorBinary(binaryName){
    //    var pkgPath = require.resolve('protractor');
    //    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    //    return path.join(protractorDir, '/'+binaryName);
    //}

}());