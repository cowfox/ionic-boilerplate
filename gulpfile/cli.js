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
    var logger                  = require('./util/logger');
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
                default: '',
                describe: 'Load "emulator" to run the app. App build is done first.',
                type: 'string'
            },
            // TODO The current `gulp-shell` does not support **conditional run**.
            'target' :{
                alias: 'target-emulator',
                demand: false,
                default: '',
                describe: 'The target iOS emulator',
                type: 'string'
            },
            'r' :{
                alias: 'run',
                demand: false,
                default: '',
                describe: 'Load "device" to run the app. App build is done first.',
                type: 'string'
            },
            // Env.
            'env' :{
                alias: 'environment',
                demand: false,
                default: 'dev',
                describe: 'Specify the "environment" that app runs on. ',
                type: 'string'
            },
            // App Versioning
            'v' :{
                alias: 'version',
                demand: false,
                default: 'patch',
                describe: 'Specify the type when bumping the app version. Use with task `gulp bump-release`. ' +
                'Possible options: major, premajor, minor, preminor, patch, prepatch, or prerelease. ',
                type: 'string'
            },
            'preid' : {
                alias: 'prerelease-id',
                demand: false,
                default: 'alpha',
                describe: 'Specify the \"prerelease id\" when bumping the app version for \"prerelease\". Usually `alpha | beta | rc`. ',
                type: 'string'
            }
        })
        .example('gulp -e|--emulate android', 'Load "Android emulator" to run the app.')
        .example('gulp -r|--run ios', 'Load "iOS device" to run the app.')
        .example('gulp bump-release --v=prerelease', 'Bump app version for prerelease.')
        .example('gulp bump-release --v=prerelease --preid=beta', 'Bump app version for "beta" prerelease.')
        .argv
    ;

    //----------------------------------------------------------
    // CLI variables and exports.
    //----------------------------------------------------------

    // Running Mode
    var inEmulateMode = false;
    var emulatePlatform = args.emulate;
    if (emulatePlatform !== '') {
        inEmulateMode = true;
    }
    var inRunMode = false;
    var runPlatform = args.run;
    if (runPlatform !== '') {
        inRunMode = true;
    }
    var inReleaseMode = args.release;

    // For `emulate`, `run`, `release`, it also needs to build the app first.
    var requiredBuild = !!(args.build || inEmulateMode || inRunMode || inReleaseMode);

    // iOS emulator devices
    var emulatorDevice = args.target;

    // Env.
    logger.info('ENV', "Current Env.:", args.environment);
    var env = args.environment;

    gutil.log("requiredBuild", args.build, inEmulateMode, requiredBuild);
    var baseTargetFolderPath = path.resolve(requiredBuild ? config.getBuildPath() : config.getDevPath());

    // Versioning
    var bumpVersionType = args.v;
    var bumpVersionPreID = args.preid;

    var exports = {

        inEmulateMode: inEmulateMode,
        emulatePlatform: emulatePlatform,
        emulatorDevice: emulatorDevice,
        inRunMode: inRunMode,
        runPlatform: runPlatform,
        inReleaseMode: inReleaseMode,
        requiredBuild: requiredBuild,
        baseTargetFolderPath: baseTargetFolderPath,

        bumpVersionType: bumpVersionType,
        bumpVersionPreID: bumpVersionPreID,

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






