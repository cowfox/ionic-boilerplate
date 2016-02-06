/***********************************************************
 * ### Helper - Build FIle Path ###
 *
 * The helper to help build the file path.
 *
 * - `buildPathByAddingExtraPart` - Add extra part to the file path. e.g. `main.css` -> `main.min.css`.
 * - `buildPathArrayByAddingExtraPart` - Add extra part to an array of file path. e.g. `main.css` -> `main.min.css`.
 * - `buildPathArrayFromBase` - Add the "base dir" to an array of file path.
 *
 ***********************************************************/

(function () {
    "use strict";

    var gutil   = require('gulp-util');
    var path    = require('path');

    var logger  = require('./logger');

    var exports = {
        buildPathByAddingExtraPart: buildPathByAddingExtraPart,
        buildPathArrayFromBase: buildPathArrayFromBase,
        buildPathArrayByAddingExtraPart: buildPathArrayByAddingExtraPart,

        pathResolve: pathResolve
    };

    module.exports = exports;

    //----------------------------------------------------------
    // Interface Functions
    //----------------------------------------------------------

    /**
     * Re-build the path array by adding the "base dir".
     *
     * @param base The path of the "base dir".
     * @param pathArray The source path array that only has "relative" path.
     * @returns {Array} The path array that has "base dir" added.
     */
    function buildPathArrayFromBase(base, pathArray) {
        var newPathArray = [];
        pathArray.forEach(function(aPath) {
            if (aPath !== undefined) {
                newPathArray.push(pathResolve(base, aPath));
            }
        });
        return newPathArray;
    }

    /**
     * Re-build the path array, by adding an "extra part" (like `.min`) to each path inside the array.
     *
     * @param pathArray The source path array that has "filename".
     * @param extraPart The extra part to be added.
     * @returns {Array} The new path array.
     */
    function buildPathArrayByAddingExtraPart(pathArray, extraPart) {

        if (extraPart === '' || extraPart === undefined) {
            // Do not do anything.....
            return pathArray;
        }

        var newPathArray = [];
        pathArray.forEach(function(aPath) {
            newPathArray.push(buildPathByAddingExtraPart(aPath, extraPart));
        });
        return newPathArray;
    }

    /**
     * Re-build the path, by adding an "extra part" (like `.min`) to it.
     *
     * @param aPath The source path that has "filename".
     * @param extraPart The extra part to be added.
     * @returns {String} The new path.
     */
    function buildPathByAddingExtraPart(aPath, extraPart) {
        if (extraPart === '' || extraPart === undefined) {
            // Do not do anything.....
            return aPath;
        }

        var basename = path.basename(aPath, path.extname(aPath));
        basename += "." + extraPart;

        logger.log("pathBuilder",
            "Add an extra part to the pat:", extraPart, aPath, path.join(path.dirname(aPath), basename + path.extname(aPath)));
        return path.join(path.dirname(aPath), basename + path.extname(aPath));
    }


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------

    function pathResolve(aPath, bPath) {

        //logger.info("pathBuilder", "from:", aPath, "and", bPath);

        if (typeof bPath === 'string' && bPath.indexOf('!') === 0) {
            var bPathNew = bPath.substring(1);
            var newPath = path.resolve(aPath, bPathNew);

            return '!' + newPath;
        }

        return path.resolve(aPath, bPath);
    }



}());