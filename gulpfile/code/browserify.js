'use strict';

var gulp                = require('gulp');
var gulpif              = require('gulp-if');
var streamify           = require('gulp-streamify');
var uglify              = require('gulp-uglify');
var sourcemaps          = require('gulp-sourcemaps');
var browserify          = require('browserify');
var ngAnnotate          = require('browserify-ngannotate');
var source              = require('vinyl-source-stream');
var buffer              = require('vinyl-buffer');
var brfs                = require('brfs');
var bulkify             = require('bulkify');
var watchify            = require('watchify');

var config              = require('../config');
var handleErr           = require('../util/handleErr');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

    var createSourcemap = !config.inProd || config.browserify.sourceMapInProd;

    var bundler = browserify({
        entries: config.path(file),
        debug: createSourcemap,
        cache: {},
        packageCache: {},
        fullPaths: !config.inProd
    });


    // If not in `production` mode,
    //
    //  - Add `watchify` - re-bundle the files.
    //
    if (!config.inProd) {
        bundler = watchify(bundler);

        bundler.on('update', function() {
            rebundle();
        });
    }

    var transforms = [
        { 'name':ngAnnotate, 'options': {}},
        { 'name':'brfs', 'options': {}},
        { 'name':'bulkify', 'options': {}}
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform.name, transform.options);
    });

    function rebundle() {
        var stream = bundler.bundle();
        var sourceMapLocation = config.inProd ? './' : '';

        return stream.on('error', handleErr)
            .pipe(source(config.browserify.bundleFile))
            .pipe(gulpif(createSourcemap, buffer()))
            .pipe(gulpif(createSourcemap, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(config.inProd, streamify(uglify({
                compress: { drop_console: true }
            }))))
            .pipe(gulpif(createSourcemap, sourcemaps.write(sourceMapLocation)))
            .pipe(gulp.dest(config.path(config.browserify.dest)));
    }

    return rebundle();

}

gulp.task('browserify', function() {

    return buildScript(config.browserify.entries);

});