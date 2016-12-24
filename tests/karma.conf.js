/***********************************************************
 *  \#\#\# Karma Unit Test - Config file \#\#\#
 *
 * This **Ionic Boilerplate** utilizes **Browserify** to do **modularization** on Angular.
 * So that the configuration is **different** from all other normal settings.
 *
 * It is based on **Mocha** and **Chai** + **Sinon**.
 *
 * Here are some highlights:
 *
 * - `frameworks` - need to include "browserify".
 * - `files` - it **only** needs to include two types of files: **unit test** files and
 * **non-CommonJS friendly library** files. If the library has been declared in `browserify-shim`, you do not need to list here.
 * - `preprocessors` - should **only** include **unit test** files, not **app files**. All the `require()`
 * hierarchy should be from **unit test** files. In other words, you need to do `require()` on the required modules
 * inside the **unit test** files, so that Browserify can know how to do bundling.
 * - `browserify` - Be sure to include `browserify-shim` as the `transform`, especially you did some declaration in `package.json` file.
 *
 *
 ***********************************************************/

(function () {
    'use strict';

    var istanbul = require('browserify-istanbul');
    var isparta  = require('isparta');

    var karmaBaseConfig = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        // The `project root` should be `../` based on the location of this config file.
        cwd: process.cwd(),


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //
        // NOTE: Include browserify first in used frameworks
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],


        // list of ALL files / patterns to load in the browser
        // https://github.com/Nikku/karma-browserify#usage
        // https://github.com/nikku/karma-browserify/blob/master/example/karma.conf.js
        files: [

            // Include all **non-CommonJS friendly library**.
            // Consider using `browserify-shim` to define them in `package.json`.
            // If doing so, then you will not need to list here.
            /*
            '../node_modules/angular/angular.js',
            '../node_modules/ionic/js/ionic.js',
            '../node_modules/ng-cordova/dist/ng-cordova.js',
            '../node_modules/ionic/js/ionic-angular.js',
            '../node_modules/angular-sanitize/angular-sanitize.js',
            '../node_modules/angular-animate/angular-animate.js',
            '../node_modules/angular-ui-router/release/angular-ui-router.js',
            */

            // `Angular-mock` is also not CommonJS compatible.
            //'../node_modules/angular-mocks/angular-mocks.js',

            // All tests files
            '../**/tests/**/*.unit.js',

            // All "directive" template files - if you need to test the directive
            '../**/templates/directive/**/*.html'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../**/tests/**/*.unit.js': ['browserify']
            // '../**/templates/directive/**/*.html': ['ng-html2js']
        },

        // browserify settings
        browserify: {
            debug: true,
            extensions: ['.js'],
            transform: [
                'browserify-shim',
                'browserify-ngannotate',
                'brfs',
                'bulkify',
                istanbul({
                    instrumenter: isparta,
                    ignore: [
                        '../**/node_modules/**',
                        '../**/tests/**',
                        '../**/*.cache.js'
                    ]
                })
            ]
        },

        /*
         ngHtml2JsPreprocessor: {
         // strip this from the file path
         stripPrefix: 'public/',
         stripSuffix: '.ext',
         // prepend this to the
         prependPrefix: 'app/'

         // or define a custom transform function
         // - cacheId returned is used to load template
         //   module(cacheId) will return template at filepath
         // cacheIdFromPath: function(filepath) {
         //     // example strips 'public/' from anywhere in the path
         //     // module(app/templates/template.html) => app/public/templates/template.html
         //     var cacheId = filepath.strip('public/', '');
         //     return cacheId;
         // },

         // - setting this option will create only a single module that contains templates
         //   from all the files, so you can load them all with module('foo')
         // - you may provide a function(htmlPath, originalPath) instead of a string
         //   if you'd like to generate modules dynamically
         //   htmlPath is a originalPath stripped and/or prepended
         //   with all provided suffixes and prefixes
         // moduleName: 'foo'
         },
         */

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'bamboo', 'coverage', 'html'],

        htmlReporter: {
            outputFile: '../reports/unit-test.html',

            // Optional
            pageTitle: 'Unit Tests - ionic-boilerplate',
            subPageTitle: 'A project boilerplate for starting development with Ionic framework.'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',

            dir : '../reports/coverage/'
        },

        bambooReporter:{
            // By default, it is relative to **Project Root**, not the **current path of this config file**.
            filename: 'reports/unit-test.mocha.json'
        },

        // Be sure to list "ALL" plugins used.
        plugins: [
            'karma-browserify',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-coverage',
            'karma-htmlfile-reporter',
            'karma-phantomjs-launcher',
            'karma-bamboo-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity

        //proxies: {
        //    '/': 'http://localhost:9876/'
        //},

        //urlRoot: '/__karma__/',
    };


    module.exports = function(config) {
        config.set(Object.assign(karmaBaseConfig));
    };

}());