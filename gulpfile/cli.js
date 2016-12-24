/***********************************************************
 * ### The extended CLI for Gulp ###
 *
 *
 ***********************************************************/

(function () {
    'use strict';

    //var gulp                    = require('gulp');
    var gutil                   = require('gulp-util');
    var path                    = require('path');

    var config                  = require('./config');
    var logger                  = require('./util/logger');
    //var pathBuilder             = require('./util/pathBuilder');

    //----------------------------------------------------------
    // CLI helper info.
    //----------------------------------------------------------
    var args = require('yargs')
        .usage('Usage: gulp [task] [options]')
        .help('h')
        .alias('h', 'help')
        .describe('h', 'Show "Extended" commands added to "Gulp" CLI.')
        .options({
            // App Running Mode
            'build' :{
                alias: 'build-app',
                demand: false,
                default: false,
                describe: 'Build the app from "app/" into "www/" folder without "Styles and Scripts minification" done.',
                type: 'boolean'
            },
            'release' :{
                alias: 'release-app',
                demand: false,
                default: false,
                describe: 'Prepare for "App Package". "App Build" is required - with "Styles and Scripts minification" done.',
                type: 'boolean'
            },
            'e' :{
                alias: 'emulate',
                demand: false,
                default: '',
                describe: 'Load "emulator" to run the app. "App Build" is required. Based on `ionic emulate [platform]`. ',
                type: 'string'
            },
            // TODO The current `gulp-shell` does not support **conditional run**.
            'target' :{
                alias: 'target-emulator',
                demand: false,
                default: '',
                describe: 'The target emulator.',
                type: 'string'
            },
            'r' :{
                alias: 'run',
                demand: false,
                default: '',
                describe: 'Load "device" to run the app. "App Build" is required. Based on `ionic run [platform]`.',
                type: 'string'
            },
            // Env.
            'env' :{
                alias: 'environment',
                demand: false,
                describe: 'Specify the "build environment", such as "development", "staging", "staging", "production", etc. ',
                type: 'string'
            },
            // App Versioning
            'v' :{
                alias: 'version',
                demand: false,
                default: 'patch',
                describe: 'Specify the type when bumping app "release" version. Use with task `gulp bump-release`. ' +
                'Possible options: major, premajor, minor, preminor, patch, prepatch, or prerelease (based on "semver")',
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
    var emulatorDevice = args.target || config.env['defaultIOSEmulateDevice'];

    // Env.
    var env = args.environment || config.env.defaultEnv;

    //
    var baseTargetFolderPath = path.resolve(requiredBuild ? config.getBuildPath() : config.getDevPath());

    // Versioning
    var bumpVersionType = args.v;
    var bumpVersionPreID = args.preid;

    // Print the **current** env. settings
    logger.info('ENV. Settings',
        "\n- Current Build Environment:", getEnvDescription(),
        "\n- Required \"Build\"?:", requiredBuild,
        "\n- In \"Release\" Mode?:", inReleaseMode);

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
        getEnvInfo: getEnvInfo,
        getEnvDescription: getEnvDescription,
        isInProduction: isInProduction
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
     * @returns {String} The current Env.
     */
    function getEnvInfo() {
        return env;
    }

    /**
     * Get the current env. info.
     *
     * @returns {String} The current Env.
     */
    function getEnvDescription() {
        return config.env.envTypeDescription[env];
    }


    /**
     * Check if it is currently in "production" mode.
     *
     * @return {boolean}
     */
    function isInProduction() {
        return env === 'production';
    }

}());






