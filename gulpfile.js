/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/24/16
 */

/* ***************************************************************************
 * ### gulpfile.js ###
 *
 * # Introducing **Gulp Flow**
 *
 * **Note**: **Gulp Flow** here is different from the NPM lib "fglp-flow"(https://www.npmjs.com/package/gulp-flow).
 * Instead, it is a **Gulp Tasks System** that helps manage your entire development cycle, including:
 *
 * - Setup the project
 * - Do Versioning
 * - Organize "Styles" files
 *
 * ## App Running Mode
 *
 * - "Development" Mode
 * - "Emulator" Mode
 * - "Device Run" Mode
 * - "Release" Mode
 *
 * ## App Env. on Release Mode
 *
 * - "Development" Env.
 * - "Staging" Env.
 * - "Testing" Env.
 * - "Production" Env.
 *
 * ---------------------
 *
 * ## A list of "Gulp" libs that the **Gulp Flow** uses.
 *
 * ### Basic
 *
 * - "gulp": "^3.8.10"
 *  - The basic Gulp.
 * -  "yargs": "^3.32.0"
 *  - Yargs be a node.js library fer hearties tryin' ter parse optstrings.
 *  - https://www.npmjs.com/package/yargs
 * -  "gulp-concat": "^2.2.0"
 *  - Concatenate files.
 *  - https://www.npmjs.com/package/gulp-concat
 * - "gulp-if": "2.0.0"
 *  - A ternary gulp plugin: conditionally control the flow of vinyl objects.
 *  - https://www.npmjs.com/package/gulp-if
 * - "streamqueue": "1.1.1"
 *  - Pipe queued streams progressively, keeping data's order.
 *  StreamQueue pipe the queued streams one by one in order to preserve their content order.
 *  - https://www.npmjs.com/package/streamqueue
 *
 * ### Files
 *
 * - "gulp-remember": "0.3.0"
 *  - It remembers files that have passed through it. It usually works with "gulp-cached".
 *  - https://www.npmjs.com/package/gulp-remember
 * - "gulp-cached": "1.1.0"
 *  - A simple in-memory file cache for gulp.
 *  - https://www.npmjs.com/package/gulp-cached
 * - "gulp-rev": "6.0.1"
 *  - Static asset revisioning by appending content hash to filenames: `unicorn.css` -> `unicorn-d41d8cd98f.css`.
 *  Make sure to set the files to **never expire** for this to have an effect.
 *  - https://www.npmjs.com/package/gulp-rev
 * - "gulp-minify-css": "^0.3.0"
 *  - gulp plugin to minify CSS, using clean-css.
 *  - https://www.npmjs.com/package/gulp-minify-css
 * - "gulp-sourcemaps": "1.6.0"
 *  - Source map support for Gulp.js.
 *  - https://www.npmjs.com/package/gulp-sourcemaps
 *
 *
 * ### Styles
 *
 * - "gulp-sass": "^2.0.4"
 *  - sass plugin
 *  - https://www.npmjs.com/package/g "
 * - "gulp-autoprefixer": "3.1.0"
 *  - Prefix CSS with **Autoprefixer**
 *  - https://www.npmjs.com/package/gulp-autoprefixer
 * - "gulp-strip-css-comments": "1.2.0"
 *  - Strip comments from CSS.
 *  - https://www.npmjs.com/package/gulp-strip-css-comments
 *
 *  "del": "2.2.0",
 "open": "0.0.5",
 "yargs": "^1.3.3",


 "gulp-rename": "^1.2.0",
 "gulp-util": "^2.2.14",
 "gulp-cached": "^1.1.0",
 "gulp-changed": "^1.2.1",
 "gulp-notify": "2.2.0",
 "gulp-if": "^2.0.0",
 "gulp-shell": "^0.2.11",
 "gulp-sequence": "0.4.4",
 "gulp-watch": "4.3.5",
 "gulp-watch-sequence": "1.0.0",
 "streamqueue": "^0.1.1",

 "gulp-minify-css": "^0.3.0",
 "gulp-autoprefixer": "^2.1.0",
 "gulp-strip-css-comments": "^1.1.0",
 "gulp-strip-debug": "^1.0.2",
 "gulp-uglify": "^1.1.0",
 "gulp-iconfont": "^1.0.0",
 "gulp-iconfont-css": "0.0.9",
 "gulp-jshint": "2.0.0",
 *
 *
 */

var requireDir = require('require-dir')

// Require all tasks in `./gulpfile/`, including sub-folders.
requireDir('./gulpfile', {
    recurse: true
})