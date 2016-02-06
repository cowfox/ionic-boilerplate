/* ***************************************************************************
 * ### gulpfile.js ###
 *
 * # Introducing **Gulp Flow**
 *
 * **Note**: **Gulp Flow** here is different from the NPM lib "gulp-flow"(https://www.npmjs.com/package/gulp-flow).
 * Instead, **Gulp Tasks System** is a **streamline application development process** that helps tackle the following
 * points:
 *
 * - Simplify Terminal interface (CLI) to avoid the use of both`gulp` and `ionic`.
 * - Enable the project code structure to accommodate different **development and building environments**, such as dev, staging, testing, prod, etc.
 * - Aim for more streamline product building system, especially for **auto-versioning**.
 * - Make the development process **CI(Continuous Integration)-friendly** and **CD(Continuous Deployment)-Driendly**.
 *
 * **Gulp Flow** streamlines the **entire** application development process, starting from **project initial setup**,
 * to **active development**, to **local and remote unit and e2e test**. and then finally **application building / releasing system**.
 *
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
 * -  "gulp-util": "^3.0.7"
 *  - Utility functions for gulp plugins
 *  - https://www.npmjs.com/package/gulp-util
 * -  "yargs": "^3.32.0"
 *  - Yargs be a node.js library fer hearties tryin' ter parse optstrings.
 *  - https://www.npmjs.com/package/yargs
 * - "napa": "2.3.0"
 *  - A helper for installing repos without a package.json with npm.
 *  - https://www.npmjs.com/package/napa
 * - "gulp-if": "2.0.0"
 *  - A ternary gulp plugin: conditionally control the flow of vinyl objects.
 *  - https://www.npmjs.com/package/gulp-if
 * - "streamqueue": "1.1.1"
 *  - Pipe queued streams progressively, keeping data's order.
 *  StreamQueue pipe the queued streams one by one in order to preserve their content order.
 *  - https://www.npmjs.com/package/streamqueue
 * - "event-stream": "3.3.2"
 *  - Construct pipes of streams of events.
 *  - https://www.npmjs.com/package/event-stream
 * - "run-sequence": "1.1.5"
 *  - Run a series of dependent gulp tasks in order.
 *  - https://www.npmjs.com/package/run-sequence
 * - "vinyl-source-stream": "1.1.0"
 *  - Use conventional text streams at the start of your gulp or vinyl pipelines.
 *  - https://www.npmjs.com/package/vinyl-source-stream
 * - "vinyl-buffer": "1.0.0"
 *  - Convert streaming vinyl files to use buffers.
 *  - https://www.npmjs.com/package/vinyl-buffer
 * - "gulp-streamify": "1.0.2"
 *  - Wrap old plugins to support streams..
 *  - https://www.npmjs.com/package/gulp-streamify
 *
 *
 * ### Env.
 * - "gulp-preprocess": "2.0.0"
 *  - Gulp plugin to preprocess HTML, JavaScript, and other files based on custom context or environment configuration.
 *  - https://www.npmjs.com/package/gulp-preprocess
 *
 *
 * ### Files
 *
 * -  "gulp-concat": "^2.2.0"
 *  - Concatenate files.
 *  - https://www.npmjs.com/package/gulp-concat
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
 * - "gulp-sourcemaps": "1.6.0"
 *  - Source map support for Gulp.js.
 *  - https://www.npmjs.com/package/gulp-sourcemaps
 * - "gulp-rename": "1.2.2"
 *  - gulp-rename is a gulp plugin to rename files easily.
 *  - https://www.npmjs.com/package/gulp-rename
 * - "gulp-changed": "1.3.0"
 *  - Only pass through changed files.
 *  - https://www.npmjs.com/package/gulp-changed
 * - "glob": "6.0.4"
 *  - This is a glob implementation in JavaScript. It uses the minimatch library to do its matching.
 *  - https://www.npmjs.com/package/glob
 * - "glob-all": "3.0.1"
 *  - Provides a similar API to glob, however instead of a single pattern, you may also use arrays of patterns.
 *  - https://www.npmjs.com/package/glob-all
 * - "del": "2.2.0"
 *  - Delete files/folders using globs.
 *  - https://www.npmjs.com/package/del
 *
 *
 * ### Assets - Images
 *
 * - "gulp-imagemin": "2.4.0"
 *  - Minify PNG, JPEG, GIF and SVG images.
 *  - https://www.npmjs.com/package/gulp-imagemin
 *
 *
 * ### Assets - Fonts
 *
 * - "gulp-iconfont": "5.0.1"
 *  - Create icons fonts from several SVG icons.
 *  - https://www.npmjs.com/package/gulp-iconfont
 * - "gulp-iconfont-css": "2.0.0"
 *  - Generate (S)CSS file for icons font created with Gulp. It fixes the issue that
 *  "Recent versions of gulp-iconfont emit a glyphs (or codepoints < 4.0.0) event".
 *  - https://www.npmjs.com/package/gulp-iconfont-css
 *
 *
 * ### HTMLs
 *
 * - "gulp-angular-templatecache": "1.8.0"
 *  - Concatenates and registers AngularJS templates in the $templateCache..
 *  - https://www.npmjs.com/package/gulp-angular-templatecache
 * - "gulp-inject": "3.0.0"
 *  - A javascript, stylesheet and webcomponent injection plugin for Gulp, i.e. inject file references into your index.html.
 *  - https://www.npmjs.com/package/gulp-inject
 *
 *
 * ### Styles
 *
 * - "gulp-sass": "^2.0.4"
 *  - sass plugin
 *  - https://www.npmjs.com/package/g
 * - "gulp-cssnano": "2.1.0"
 *  - Minify CSS with cssnano.
 *  - https://www.npmjs.com/package/gulp-cssnano
 * - "gulp-autoprefixer": "3.1.0"
 *  - Prefix CSS with **Autoprefixer**
 *  - https://www.npmjs.com/package/gulp-autoprefixer
 * - "gulp-strip-css-comments": "1.2.0"
 *  - Strip comments from CSS.
 *  - https://www.npmjs.com/package/gulp-strip-css-comments
 *
 *
 * ### Scripts
 *
 * - "gulp-jshint": "2.0.0"
 *  - JSHint plugin for gulp.
 *  - https://www.npmjs.com/package/gulp-jshint
 * - "jshint-stylish": "^2.1.0"
 *  - Stylish reporter for JSHint.
 *  - https://www.npmjs.com/package/jshint-stylish
 * - "gulp-jshint-html-reporter": "0.1.3"
 *  - Simple generator of HTML report for gulp-jshint that writes its output to a html file which looks pretty.
 *  - https://www.npmjs.com/package/gulp-jshint-html-reporter
 * - "gulp-uglify": "^1.1.0"
 *  - Minify files with UglifyJS..
 *  - https://www.npmjs.com/package/gulp-uglify
 *
 *
 *  ### Scripts - Browserify
 *
 * - "browserify": "13.0.0"
 *  - browser-side require() the node way.
 *  - https://www.npmjs.com/package/browserify
 * - "browserify-shim": "^3.8.8"
 *  - Makes CommonJS-incompatible modules browserifyable.
 *  - https://www.npmjs.com/package/browserify-shim
 * - "browserify-ngannotate": "2.0.0"
 *  - A browserify transform that uses ng-annotate to add dependency injection annotations
 *  to your AngularJS source code, preparing it for minification.
 *  - https://www.npmjs.com/package/browserify-ngannotate
 * - "brfs": "1.4.3"
 *  - browserify fs.readFileSync() static asset inliner.
 *  - https://www.npmjs.com/package/brfs
 * - "bulkify": "1.1.1"
 *  - transform inline bulk-require calls into statically resolvable require maps.
 *  - https://www.npmjs.com/package/bulkify
 *
 *
 * ### Live Reload
 *
 * - "express": "4.13.4"
 *  - Fast, unopinionated, minimalist web framework.
 *  - https://www.npmjs.com/package/express
 * - "livereload": "0.4.1"
 *  - LiveReload server.
 *  - https://www.npmjs.com/package/livereload
 * - "gulp-livereload": "3.8.1"
 *  - Gulp plugin for livereload.
 *  - https://www.npmjs.com/package/gulp-livereload
 * - "connect-livereload": "0.5.4"
 *  - Connect middleware for adding the livereload script to the response.
 *  - https://www.npmjs.com/package/connect-livereload
 * - "open": "0.0.5"
 *  - open a file or url in the user's preferred application.
 *  - https://www.npmjs.com/package/open
 *
 *
 * ### Watch
 *
 * - "gulp-watch": "4.3.5"
 *  - Watch, that actually is an endless stream.
 *  - https://www.npmjs.com/package/gulp-watch
 * - "gulp-watch-sequence": "1.0.0"
 *  - Merge the actions of multiple watch triggers into a single common sequence..
 *  - https://www.npmjs.com/package/gulp-watch-sequence
 *
 *
 * ### Testing
 *
 * - "karma": "0.13.19"
 *  - Spectacular Test Runner for JavaScript.
 *  - https://www.npmjs.com/package/karma
 * - "karma-htmlfile-reporter": "0.2.2"
 *  - A Karma plugin. Report results in styled html format.
 *  - https://www.npmjs.com/package/karma-htmlfile-reporter
 * - "protractor": "3.0.0"
 *  - Webdriver E2E test wrapper for Angular.
 *  - https://www.npmjs.com/package/protractor
 * - "gulp-protractor": "2.1.0"
 *  - A helper for protactor and gulp
 *  - https://www.npmjs.com/package/gulp-protractor
 *
 *
 * ### Versioning
 *
 * - "semver": "5.1.0"
 *  - The semantic version parser used by npm.
 *  - https://www.npmjs.com/package/semver
 * - "cordova-config": "0.6.2"
 *  - Parse and edit the config.xml file of a cordova project
 *  - https://www.npmjs.com/package/cordova-config
 *
 *
 * ### Others
 *
 * -  "gulp-notify": "2.2.0"
 *  - Gulp plugin to send messages based on Vinyl Files or Errors to Mac OS X,
 *  Linux or Windows using the node-notifier module. Fallbacks to Growl or simply logging
 *  - https://www.npmjs.com/package/gulp-notify
 * - "dateformat": "1.0.12"
 *  - A node.js package for Steven Levithan's excellent dateFormat() function.
 *  - https://www.npmjs.com/package/dateformat
 * - "gulp-run": "1.6.12"
 *  - Pipe to shell commands in gulp.
 *  - https://www.npmjs.com/package/gulp-run
 * - "gulp-shell": "0.5.2"
 *  - A handy command line interface for gulp.
 *  - https://www.npmjs.com/package/gulp-shell
 *
 */

var requireDir = require('require-dir')

// Require all tasks in `./gulpfile/`, including sub-folders.
requireDir('./gulpfile', {
    recurse: true
})