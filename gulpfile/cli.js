/***********************************************************
 * ### The extended CLI for Gulp ###
 *
 *
 ***********************************************************/

(function () {
    'use strict';

    var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var path                    = require('path');

    var config                  = require('./config');
    var pathBuilder             = require('./util/pathBuilder');

    //----------------------------------------------------------
    // CLI helper info.
    //----------------------------------------------------------
    var args = require('yargs')
        .usage('Usage: gulp [options] [platform]')
        .help('h')
        .alias('h', 'help')
        .describe('h', 'Show "NEW" options added to "gulp" cmd.')
        .options({
            // App Running Mode
            'build' :{
                alias: 'build-app',
                demand: false,
                default: false,
                describe: 'Build the app from "app/" into "www/" folder without "minification" done.',
                type: 'boolean'
            },
            'release' :{
                alias: 'release-app',
                demand: false,
                default: false,
                describe: 'Release the app as package. "Build" is required - with all "optimizations" done.',
                type: 'boolean'
            },
            'e' :{
                alias: 'emulate',
                demand: false,
                default: false,
                describe: 'Load "emulator" to run the app. App build is done first.',
                type: 'boolean'
            },
            'r' :{
                alias: 'run',
                demand: false,
                default: false,
                describe: 'Load "device" to run the app. App build is done first.',
                type: 'boolean'
            },
            // Env.
            'env' :{
                alias: 'environment',
                demand: false,
                default: 'dev',
                describe: 'Specify the "environment" that app runs on. ',
                type: 'string'
            }
        })
        .example('gulp -e|--emulate android', 'Load "Android emulator" to run the app.')
        .example('gulp -r|--run ios', 'Load "iOS device" to run the app.')
        .example('gulp --env=prod', 'Set "environment" to be "production" mode.')
        .argv
    ;

    //----------------------------------------------------------
    // CLI variables and exports.
    //----------------------------------------------------------

    // Running Mode
    var inEmulateMode = args.emulate;
    var emulatePlatform = 'ios'; // Set `ios` as the default value to `emulate` and `run`.
    var inRunMode = args.run;
    var runPlatform = 'ios'; // Set `ios` as the default value to `emulate` and `run`.
    var inReleaseMode = args.release;
    // For `emulate`, `run`, `release`, it also needs to build the app first.
    var requiredBuild = (args.build || inEmulateMode || inRunMode || inReleaseMode);

    // Env.
    gutil.log("Current Env.", args.environment);
    var env = args.environment;

    gutil.log("requiredBuild", args.build, inReleaseMode, requiredBuild);
    var baseTargetFolderPath = path.resolve(requiredBuild ? config.getBuildPath() : config.getDevPath());

    var exports = {

        inEmulateMode: inEmulateMode,
        emulatePlatform: emulatePlatform,
        inRunMode: inRunMode,
        runPlatform: runPlatform,
        inReleaseMode: inReleaseMode,
        requiredBuild: requiredBuild,
        baseTargetFolderPath: baseTargetFolderPath,

        // Func
        solveTargetFolderPath: solveTargetFolderPath,
        getEnvInfo: getEnvInfo
    };

    module.exports = exports;


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * Get the target folder path based on if is "in Build".
     *
     * @param additionalPath (optional) An extra path.
     * @returns {*} The path of "target folder". If `additionalPath` is available, it returns the "combined' version.
     */
    function solveTargetFolderPath(additionalPath) {
        if (additionalPath !== undefined) {
            return path.resolve(requiredBuild ? config.getBuildPath(additionalPath) : config.getDevPath(additionalPath));
        }
        return baseTargetFolderPath;
    }

    /**
     * Get the current env. info.
     *
     * @returns {Object} The current Env.
     */
    function getEnvInfo() {
        return {
            NODE_ENV: config.env.envType[env]
        }
    }

}());






