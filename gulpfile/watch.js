/* ***************************************************************************
 * ### Gulp - watch task ###
 *
 */

'use strict';

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var sequence        = require('gulp-watch-sequence');
var gulpSequence    = require('gulp-sequence');

var config      = require('./config');

gulp.task('watch', [], function() {

    global.isWatching = true;

    var queue = sequence(300);

    watch(config.scripts.src, {
        name      : 'scripts',
        emitOnGlob: false
    }, queue.getHandler('browserify', 'lint'));

    // All scripts are automatically watched and re-bundled by `watchify` inside `browserify` task.
    //gulp.watch(config.scripts.src, function(cb) {
    //    gulpSequence('browserify', 'lint', cb);
    //});
    //gulp.watch(config.styles.src,  ['styles']);
    //gulp.watch(config.images.src,  ['images']);
    //gulp.watch(config.fonts.src,   ['fonts']);
    //gulp.watch(config.views.watch, ['views']);

});