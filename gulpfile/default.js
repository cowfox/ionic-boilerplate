/* ***************************************************************************
 * ### Gulp - default task ###
 *
 */

'use strict';

var gulp        = require('gulp');
var gulpSequence    = require('gulp-sequence');


gulp.task('default', function(cb){

    gulpSequence('clean', 'browserify', cb);
});


// Ensure process ends after all Gulp tasks are finished
gulp.on('stop', function () {
    if ( !global.isWatching ) {
        process.nextTick(function () {
            process.exit(0);
        });
    }
});
