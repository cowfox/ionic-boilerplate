'use strict';

var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');

var karmaBaseConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    cwd: process.cwd(),


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
        // app-specific code
        '../www/js/app.js',

        // 3rd-party resources
        '../node_modules/angular-mocks/angular-mocks.js',

        // tests files
        '../**/tests/**/*.unit.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '../www/js/**/*.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    browserify: {
        debug: true,
        extensions: ['.js'],
        transform: [
            'browserify-ngannotate',
            'bulkify',
            istanbul({
                instrumenter: isparta,
                ignore: [
                    '../**/node_modules/**',
                    '../www/lib/**',
                    '../**/tests/**'
                ]
            })
        ]
    },

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
