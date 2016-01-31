/***********************************************************
 * ### Config file for **Gulp Flow** ###
 *
 *
 ***********************************************************/

(function () {

    'use strict';

    var path        = require('path');

    module.exports = {

        //----------------------------------------------------------
        // Project Info
        //----------------------------------------------------------

        // Root dir.
        root: {
            base: path.join(__dirname,  '../'),  // Project Root
            app: "./app",
            dev: "./.tmp",
            build: "./www",
            vendor: "./bower_components"
        },

        appInfo: {
            manifest: "./manifest.json", // under `app` folder.
            syncTargets: [
                "./package.json",
                "./bower.json",
                "./ionic.project"
            ]
        },

        env: {
            // Use `gulp-preprocess` to help process the ENV configurations.
            // It depends on the env. variable `NODE_ENV" from NodeJS.
            envType: {
                dev: 'development',
                test: 'test',
                staging: 'staging',
                prod: 'production'
            }
        },

        versioning: {
            version: "version",
            build: "build-version",
            dev: "dev-version"
        },


        //----------------------------------------------------------
        // Styles
        //----------------------------------------------------------

        styles: {
            styleFolderPath: "./styles",
            mainSassFile: "main.scss",
            mainCssFIle: "main.css",
            vendorCssFile: "vendor.css",
            // Options for autoprefixer.
            // {@llink https://github.com/postcss/autoprefixer}.
            autoprefixerOptions: {
                browsers: [
                    'last 1 Chrome version',
                    'last 3 iOS versions',
                    'last 3 Android versions'
                ],
                cascade: false
            },
            // Options for minfyCSS
            // Based on "CleanCSS" - {@link https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api}.
            minifyCssOptions: {
                compatibility: 'ie8'
            },
            // The "relative" path to "root path" of vendor folder.
            vendorCssFilePaths: [
                'ionic/css/ionic.css'
            ]
        },

        //----------------------------------------------------------
        // Scripts
        //----------------------------------------------------------

        scripts: {
            scriptFolderPath: "./scripts",
            // The path array to the JS files that needs to be screened.
            lintFilePaths: [
                './**/*.js'
            ],
            // By default, it uses `jshint-stylish`.
            // If `true`, it uses `gulp-jshint-html-reporter`.
            // Make sure the related **Gulp Plugin** is installed.
            useLintHTMLReporter: true,
            lintHTMLOutputFilename: './jshint-output.html', // Under "base dir".
            // If need to also do code screening on Gulp Tasks files.
            needLintGulpTaskFiles: true,
            gulpFilePath: "./gulpfile/**/*.js",
            src: [
                '!www/js/bundles/**/*',
                'www/js/**/*.js'
            ]
        },


        //----------------------------------------------------------
        // Helper Functions
        //----------------------------------------------------------

        /**
         * Get path for "base".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "base". If `additionalPath` is available, it returns the "combined' version.
         */
        getBasePath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return path.join(this.root.base, additionalPath);
            }
            return path.join(this.root.base);
        },

        /**
         * Get path for "app".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "app". If `additionalPath` is available, it returns the "combined' version.
         */
        getAppPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return path.join(this.root.base, this.root.app, additionalPath);
            }
            return path.join(this.root.base, this.root.app);
        },

        /**
         * Get path for "dev".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "dev". If `additionalPath` is available, it returns the "combined' version.
         */
        getDevPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return path.join(this.root.base, this.root.dev, additionalPath);
            }
            return path.join(this.root.base, this.root.dev);
        },

        /**
         * Get path for "build".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "build". If `additionalPath` is available, it returns the "combined' version.
         */
        getBuildPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return path.join(this.root.base, this.root.build, additionalPath);
            }
            return path.join(this.root.base, this.root.build);
        },

        /**
         * Get path for "vendor".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "build". If `additionalPath` is available, it returns the "combined' version.
         */
        getVendorPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return path.join(this.root.base, this.root.vendor, additionalPath);
            }
            return path.join(this.root.base, this.root.vendor);
        },

        /**
         * get path of "manifest" file. .
         *
         * @returns {*} The path of "manifest".
         */
        getManifestFile: function() {
            return this.getAppPath(this.appInfo.manifest);
        },



        // Base src dir
        baseDir: path.join(__dirname,  '../'),  // Project Root
        devSrcDir: '.tmp',
        buikdSrcDir: 'www',

        // Env. (development | production)
        inProd : false,

        // browserify
        browserify: {
            entries: 'js/app.js',
            bundleFile: 'app.bundle.js',
            dest: 'js/bundles/',
            sourceMapInProd: false
        },

        // Clean
        clean: {
            cleanPath: [
                'js/bundles/'
            ]
        },

        // Testing
        test: {
            // TODO The `configFile` inside gulp-karma take **relative** path......
            karma: '../../../tests/karma.conf.js',
            protractor: 'tests/protractor.conf.js',
            protractorTargets: [
                '**/tests/**/*.spec.js'
            ]
        },

        // Utils
        path: function(relativePath) {
            return this.srcDir + relativePath;
        }

    };

}());
