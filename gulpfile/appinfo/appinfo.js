/***********************************************************
 *  \#\#\# Gulp Task - Sync AppInfo  \#\#\#
 *
 * By default, the **App Info** is defined in the main **manifest** file (under the `app` folder).
 * And this task is to sync all the info inside that **manifest** file to all other
 * project config files (like NPM - package.json, Bower - bower.json, etc.)
 *
 * Both the **path to manifest file** and the **list of config files** can be config in `config.js` file.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    //var gutil                   = require('gulp-util');
    //var fs                      = require('fs');
    //var path                    = require('path');

    var cordovaConfigWorker           = require('cordova-config');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('../util/logger');
    //var handleErr               = require('../util/handleErr');
    var pathBuilder             = require('../util/pathBuilder');
    var fileOp                  = require('../util/fileOp');

    // Gulp task name
    var taskName = "appinfo";

    //----------------------------------------------------------
    // Gulp Tasks
    //----------------------------------------------------------

    gulp.task(taskName, function() {

        var manifestFilePath = config.getManifestFile();
        var targetFilePathArray = pathBuilder.buildPathArrayFromBase(config.root.base, config.appInfo.syncTargets);

        targetFilePathArray.forEach(function(filePath) {
            fileOp.copyJsonNodes(manifestFilePath, filePath);
            logger.info(taskName,
                "App Info synced to:", filePath, "from:", manifestFilePath);
        });

        // Update Cordova `config.xml` file
        upadteAppinfoToCordovaConfig(manifestFilePath, config.getBasePath('./config.xml'));
    });


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function upadteAppinfoToCordovaConfig(sourceFilePath, cordovaConfigFilePath) {
        var cordovaConfig = new cordovaConfigWorker(cordovaConfigFilePath);
        var sourceJsonFile = fileOp.readyJSONFile(sourceFilePath);

        /*
            Here are the info we need to update:

            - App Name:             `name`              -> <name></name>
            - App ID                `id``               -> <widget id="com.xxx.yyy"></widget>
            - App Description:      `description`       -> <description></description>
            - Author                `author`            -> <author email="email" href="website">name</author>
            - Version               `version`           -> <widget version="x.y.x"></widget>
            - Android versionCode   `build-version`     -> <widget android-versionCode="#"></widget>
            - iOS CFBundleVersion   `build-version`     -> <widget ios-CFBundleVersion="#"></widget>

            Depending on the current env, it can also add a "suffix" to both "app name" and "app id".
            For example, the app name "App" will be become "App Dev".
         */

        var isInProduction = cli.isInProduction();
        var envCode = cli.getEnvDescription();

        if (sourceJsonFile.hasOwnProperty('appName')) {
            var appName = sourceJsonFile.appName;
            if(!isInProduction) {
                appName = appName + ' ' + envCode;
            }
            cordovaConfig.setName(appName);
        }
        if (sourceJsonFile.hasOwnProperty('id')) {
            var appID = sourceJsonFile.id;
            if(!isInProduction) {
                appID = appID + '.' + envCode;
            }
            cordovaConfig.setID(appID);
        }
        if (sourceJsonFile.hasOwnProperty('description')) {
            cordovaConfig.setDescription(sourceJsonFile.description);
        }
        if (sourceJsonFile.hasOwnProperty('author')) {
            var author = sourceJsonFile.author;
            cordovaConfig.setAuthor(author.name, author.email, author.url);
        }

        // Assign **version** to either **release version** or **dev release**
        // based on the current **build environment**.
        //
        // If it is in **production**, use **release version**. Otherwise, use **dev release**.
        // TODO Temp disable it due to the `cordova-config` plugin
        // Currently, `cordova-config` does not support *pre-release** format, only for **x.y.x**.
        //if (cli.getEnvInfo() === 'production') {
        //    if (sourceJsonFile.hasOwnProperty(config.versioning.version)) {
        //        cordovaConfig.setVersion(sourceJsonFile[config.versioning.version]);
        //    }
        //} else {
        //    console.log("config.versioning.dev",config.versioning);
        //    if (sourceJsonFile.hasOwnProperty(config.versioning.dev)) {
        //        cordovaConfig.setVersion(sourceJsonFile[config.versioning.dev]);
        //    }
        //}

        if (sourceJsonFile.hasOwnProperty(config.versioning.releaseVersion)) {
            cordovaConfig.setVersion(sourceJsonFile[config.versioning.releaseVersion]);
        }

        if (sourceJsonFile.hasOwnProperty(config.versioning.buildNumber)) {
            cordovaConfig.setAndroidVersionCode(sourceJsonFile[config.versioning.buildNumber]);
            cordovaConfig.setIOSBundleVersion(sourceJsonFile[config.versioning.buildNumber]);
        }

        // Write the config file
        cordovaConfig.writeSync();
    }

}());