#!/usr/bin/env node

/***********************************************************
 *  \#\#\# Cordova Hook - `After Platform Add` - Update XCConfig \#\#\#
 *
 * It is to update the Xcode`.xcconfig` files, including:
 *
 * - `build.xcconfig` - Where the codesigning of "Development build" locates.
 * - `build-release.xcconfig` - Where the codesigning of "Distribution build" locates.
 *
 * These files are under `platforms/ios/cordova/`.
 *
 ***********************************************************/

var path            = require('path');
var fs              = require('fs');

// Required variables from `process.env`.
var XCODE_DEVELOPER_NAME = process.env.XCODE_DEVELOPER_NAME;

// Including '= " is to exclude other appearances.
var DEBUG_DEVELOPER_NAME_REGEX = /= (iPhone Developer)/g;
var RELEASE_DEVELOPER_NAME_REGEX = /= (iPhone Distribution)/g;

// Load **project root** from process.env.
var projectRootPath = process.env.PWD;
var targetXcconfigFolderPath = path.resolve(projectRootPath, './platforms/ios/cordova/');


//----------------------------------------------------------
// Processes
//----------------------------------------------------------

// Only need to update **debug** xcconfig file while in `development` env.
if(process.env.NODE_ENV === 'development') {
    var buildDebugXcconfig = 'build.xcconfig';
    _updateXcconfigFile(path.resolve(targetXcconfigFolderPath, buildDebugXcconfig),
        DEBUG_DEVELOPER_NAME_REGEX,
        XCODE_DEVELOPER_NAME);
} else {
    var buildReleaseXcconfig = 'build-release.xcconfig';
    _updateXcconfigFile(path.resolve(targetXcconfigFolderPath, buildReleaseXcconfig),
        RELEASE_DEVELOPER_NAME_REGEX,
        XCODE_DEVELOPER_NAME);
}

//----------------------------------------------------------
// Internal Functions
//----------------------------------------------------------

function _updateXcconfigFile(targetFile, regex, replacement) {

    fs.readFile(targetFile, 'utf8', function (err, fileData) {
        if(err) {
            return console.log(err);
        }

        var outputFileData;
        outputFileData = fileData.replace(regex, function(matched, p1) {
            //console.log('matched', matched, p1);
            return '= ' + replacement;
        });

        // Write file
        fs.writeFile(targetFile, outputFileData, 'utf8', function (err) {
            if(err) {
                return console.log('The Cordova "iOS" platform has not been added.' +
                    'No "scconfig" to be updated.',err);
            }
            console.log('Cordova iOS "xcconfig" is updated to:', targetFile)
        });
    });
}