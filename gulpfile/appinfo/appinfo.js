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

    var cordovaConfig           = require('cordova-config');

    var config                  = require('../config');
    //var cli                     = require('../cli');
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
        var config = new cordovaConfig(cordovaConfigFilePath);
        var sourceJsonFile = fileOp.readyJSONFile(sourceFilePath);

        /*
            Here are the info we need to update:

            - App Name:             `name`              -> <name></name>
            - App ID                `id``               -> <widget id="com.xxx.yyy"></widget>
            - App Description:      `description`       -> <description></description>
            - Author                `author`            -> <author email="email" href="website">name</author>
            - Version               `version`           -> <widget version="x.y.x"></widget>
            - Android versionCode   `build-version`     -> <widget android-versionCode="#"></widget>
            - iOS CFBundleVersion   `build-version`           -> <widget ios-CFBundleVersion="x.y.x"></widget>

         */
        if (sourceJsonFile.hasOwnProperty('name')) {
            config.setName(sourceJsonFile.name);
        }
        if (sourceJsonFile.hasOwnProperty('id')) {
            config.setID(sourceJsonFile.id);
        }
        if (sourceJsonFile.hasOwnProperty('description')) {
            config.setDescription(sourceJsonFile.description);
        }
        if (sourceJsonFile.hasOwnProperty('author')) {
            var author = sourceJsonFile.author;
            config.setAuthor(author.name, author.email, author.url);
        }
        if (sourceJsonFile.hasOwnProperty('version')) {
            config.setVersion(sourceJsonFile.version);
        }
        if (sourceJsonFile.hasOwnProperty('build-version')) {
            config.setAndroidVersionCode(sourceJsonFile['build-version']);
            config.setIOSBundleVersion(sourceJsonFile['build-version']);
        }

        // Write the config file
        config.writeSync();
    }

}());