/***********************************************************
 * Helper for File Operations ###
 *
 ***********************************************************/

(function () {
    "use strict";

    var gulp                    = require('gulp');
    var path                    = require('path');
    var fs                      = require('fs');

    var config                  = require('../config');
    var cli                     = require('../cli');
    var logger                  = require('./logger');

    var exports = {
        readyJSONFile: readyJSONFile,
        writeJSONFile: writeJSONFile,
        copyJsonNodes: copyJsonNodes
    };

    module.exports = exports;

    //----------------------------------------------------------
    // Interface Functions
    //----------------------------------------------------------

    function readyJSONFile(filePath) {

        var file = fs.readFileSync(filePath, 'utf8');
        if (file === undefined) {
            logger.error('FileOP', "Parse JSON File Failed.");
            return undefined;
        }

        try {
            var json = JSON.parse(file);
            return json;
        } catch(error) {
            logger.error('FileOP', "Parse JSON File Failed.", error, " file path:", filePath);
            return undefined;
        }

        // TODO Need to handle the "Async" way.
        //fs.readFile(filePath, 'utf8', function (error, data) {
        //    if (error) {
        //        console.log("Read JSON File Failed.", error);
        //        return undefined;
        //    }
        //
        //    try {
        //        var json = JSON.parse(data);
        //        return json;
        //    } catch(error) {
        //        console.log("Parse JSON File Failed.", error);
        //        return undefined;
        //    }
        //});
    }

    function writeJSONFile(filePath, data) {

        // Need to use `JSON.stringify` to convert back to a string.
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

        // TODO Need to handle the "Async" way.
        //fs.writeFile(filePath, data, 'utf8', function (error) {
        //    if (error) {
        //        console.log("Write to JSON File Failed.", error);
        //        return undefined;
        //    }
        //});
    }

    function copyJsonNodes(sourceFIlePath, targetFilePath) {

        var sourceJsonFile = this.readyJSONFile(sourceFIlePath);
        var targetJsonFile = this.readyJSONFile(targetFilePath);

        for (var key in sourceJsonFile) {
            if (sourceJsonFile.hasOwnProperty(key)) {
                targetJsonFile[key] = sourceJsonFile[key]
            }
        }

        this.writeJSONFile(targetFilePath, targetJsonFile);
    }

}());