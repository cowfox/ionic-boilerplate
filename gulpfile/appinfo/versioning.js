/***********************************************************
 *  \#\#\# Gulp Tasks - Versioning \#\#\#
 *
 * In the current project setting, it supports **three** types of **version #**:
 *
 * - Build # - Normally increase by each **app build** automatically.
 * - Dev Version # - Usually used for versioning **daily build** - by CI, for example.
 * - Release Version # - It follows **8semver versioning** standard.
 *
 * {@link http://semver.org/ | semver versioning}
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    var semver                  = require('semver');
    var dateFormat              = require('dateformat');
    var cordovaConfig           = require('cordova-config');


    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    //var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');
    var fileOp                  = require('../util/fileOp');

    // Possible options for 'semver release type'
    var semverReleaseType = [
        'major',
        'premajor',
        'minor',
        'preminor',
        'patch',
        'prepatch',
        'prerelease'
    ];

    // The path array contains all files that need to be updated.
    // It should also include the "source file" - manifest file.
    var targetFilePathArray = pathBuilder.buildPathArrayFromBase(config.root.base, config.appInfo.syncTargets);
    // Add
    targetFilePathArray.push(config.getManifestFile());

    var isInProduction = cli.isInProduction();

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task('versioning', function() {
        logger.info('bump',
            "\n Use the following Gulp tasks to bump your app version. ",
            "\n`gulp bump-build` - Bump the \"Build #\".",
            "\n`gulp bump-dev` - Bump the \"Dev Version #\".",
            "\n`gulp bump-release -v=prerelease --preid=beta` - Bump the \"Release Version #\" based on \"semver\" standard.",
            "\n`gulp bump --env=production -v=prerelease --preid=beta` - Use `gulp bump-dev` or `gulp bump-release -v=prerelease --preid=beta` depending on `env.`. ");
    });

    /**
     * Decide which **version** to use: **Release Version** or **Dev Version**.
     */
    gulp.task('bump', function() {
        if (isInProduction) {
            return bumpReleaseVersion(targetFilePathArray);
        } else {
            return bumpDevVersion(targetFilePathArray);
        }
    });

    /**
     * Bump **Release Version**
     */
    gulp.task('bump-release', function() {
        return bumpReleaseVersion(targetFilePathArray);
    });

    /**
     * Bump **Build #**
     */
    gulp.task('bump-build', function() {
        return bumpBuildVersion(targetFilePathArray);
    });

    /**
     * Bump **Dev Version**
     *
     * Current "cordova-config" does not support a "non-semver" version number to be written.
     * So, "bumping a dev version" is much more like useless.
     *
     */
    gulp.task('bump-dev', function() {
        // return bumpDevVersion(targetFilePathArray);
    });


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    /**
     * Bump the "release version" based on "semver" standard.
     *
     * This task works with two extra "arguments":
     *
     * - `-v|--version` - define the "release type".
     * - `--preid` - define the "prerelease type".
     *
     * @param targetFilePathArray The path array of target files to be updated.
     */
    function bumpReleaseVersion(targetFilePathArray) {

        var releaseVersion = _getCurrentVersion(config.versioning.releaseVersion);

        // Check if the current "release version" is valid for "semver"
        if (!semver.valid(releaseVersion)) {
            logger.error('bump-release',
                "The current release version is not valid based on \"semver\":", releaseVersion,
                "\nPlease check http://semver.org/ for more details.");

            return;
        }

        var newVersion = semver.inc(releaseVersion, cli.bumpVersionType, cli.bumpVersionPreID);

        if (!newVersion) {
            logger.error('bump-release',
                "The \"release type\" by '--v' is not valid.",
                "\nHere are the available options:", semverReleaseType);

            return;
        }

        // Save the new version back to all the related files, including "manifest" file.
        saveNewVersionToAllFiles(config.versioning.releaseVersion, newVersion, targetFilePathArray);

        // Set it to "Cordova config.xml".
        var cordova = new cordovaConfig(config.getBasePath('./config.xml'));
        // TODO The `setVersion()` only support `x.y.x` format......
        cordova.setVersion(semver.major(newVersion) + '.' + semver.minor(newVersion) + '.' + semver.patch(newVersion));
        cordova.writeSync();

        logger.info('bump-release',
            "Bump the \"Release\' version to:", newVersion, "| original:", releaseVersion);
    }

    /**
     * Find the "Dev Version#" from all target filesand upate it.
     *
     * By default, the "dev version" is the combination of "release version" and "current date", like
     * "0.6.6-20160606".
     *
     * @param targetFilePathArray The path array of target files to be updated.
     */
    function bumpDevVersion(targetFilePathArray) {

        // Get the current "release" version
        var version = _getCurrentVersion(config.versioning.releaseVersion);
        var date = dateFormat(new Date(), "yyyymmdd");
        var newDevVersion = version + '-' + date;

        // Save the new version back to all the related files, including "manifest" file.
        saveNewVersionToAllFiles(config.versioning.devVersion, newDevVersion, targetFilePathArray);

        logger.info('bump-dev',
            "Bump the \"Dev\' version to:", newDevVersion);

    }

    /**
     * Find the "build #" from all target files and increase it by "1".
     *
     * @param targetFilePathArray The path array of target files to be updated.
     *
     */
    function bumpBuildVersion(targetFilePathArray) {

        var version = parseInt(_getCurrentVersion(config.versioning.buildNumber));
        var newVersion = (version + 1).toString();

        // Save the new version back to all the related files, including "manifest" file.
        saveNewVersionToAllFiles(config.versioning.buildNumber, newVersion, targetFilePathArray);

        // Set it to "Cordova config.xml".
        var cordova = new cordovaConfig(config.getBasePath('./config.xml'));
        cordova.setAndroidVersionCode(newVersion);
        cordova.setIOSBundleVersion(newVersion);
        cordova.writeSync();

        logger.info('bump-build',
            "Bump the \"Build\' version from:", version, "| original:", newVersion);
    }

    /**
     * Save the new version # back to the files.
     *
     * @note All the files have to share the same "root dir".
     *
     * @param aKey The key that the "new" version has.
     * @param newVersion The "new" version to be saved.
     * @param targetFilePathArray The path array of target files to be updated.
     * @private
     */
    function saveNewVersionToAllFiles(aKey, newVersion, targetFilePathArray) {

        targetFilePathArray.forEach(function(aFile) {
            var json = fileOp.readyJSONFile(aFile);
            json[aKey] = newVersion;
            fileOp.writeJSONFile(aFile, json);
        });
    }


    function _getCurrentVersion(aKey) {
        var json = fileOp.readyJSONFile(config.getManifestFile());
        var version = json[aKey];

        return version;
    }

}());