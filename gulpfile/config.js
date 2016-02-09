/***********************************************************
 * ### Config file for **Gulp Flow** ###
 *
 *
 ***********************************************************/

(function () {

    'use strict';

    var path        = require('path');
    var pathBuilder = require('./util/pathBuilder');

    var config = {

        //----------------------------------------------------------
        // Project Info
        //----------------------------------------------------------
        // Root dir.
        root: {
            base: path.join(__dirname,  '../'),  // Project Root
            // "App Root" - all the source code should be under this folder.
            app: "./app",
            // "Dev Root" - app will be built into this folder while doing "dev" preview (in browser)
            dev: "./.tmp",
            // "Build Root" - app will be built into this folder while doing "emulation", "device tests" and "release".
            build: "./www",
            // "Vendor Root" - by "bower".
            vendor: "./bower_components"
        },

        appInfo: {
            manifest: "./manifest.json", // under `app` folder.
            syncTargets: [
                // Relative to 'App Root'.
                // By default, `config.xml` is included.
                "./package.json",
                "./bower.json",
                "./ionic.project"
            ]
        },

        env: {
            // Use `gulp-preprocess` to help process the ENV configurations.
            // It depends on the env. variable `NODE_ENV" from NodeJS.
            envType: {
                development: 'development',
                test: 'test',
                staging: 'staging',
                production: 'production'
            },

            // ----
            // Environment global variables
            // ----
            "global" : {
            },

            // ----
            // Environment specific variables
            // ----
            "development": {
                // The **name** of the **Code Signing Identity**.
                XCODE_DEVELOPER_NAME: "iPhone Developer: Lei Shi (3Y46G6EDBE)",
                // The filename (excluding file extension `.mobileprovision`) of provisioning profile.
                XCODE_PROVISIONING_PROFILE_FILENAME: "xcode-profile-debug"
            },
            "production": {
                // The **name** of the **Code Signing Identity**.
                XCODE_DEVELOPER_NAME: "iPhone Distribution: Lei Shi (3Y46G6EDBE)",
                // The filename (excluding file extension `.mobileprovision`) of provisioning profile.
                XCODE_PROVISIONING_PROFILE_FILENAME: "xcode-profile-release"
            }
        },

        versioning: {
            version: "version",
            build: "build-version",
            dev: "dev-version"
        },


        //----------------------------------------------------------
        // Assets - App Icons & Images
        //----------------------------------------------------------
        assets: {
            // Relative to 'App Root'.
            imageFolderPath: './images',
            imageFilePaths: [
                // Relative to `imageFolderPath`.
                './**/*'
            ],

            // ----
            // App Icons.
            // Check Gulp task `appicon` for more details.
            // ----
            appiconFolderPath: './icons',
            appiconFilePaths: [
                // Relative to `appiconFolderPath`.
                './icon.+(png|psd|ai)',
                './splash.+(png|psd|ai)'
            ],
            // Relative to 'Project Root'.
            // The target folder that the **app icon** is copied to.
            // Then the app icon is used by `ionic resources`.
            // Note: Just keep it as default.
            appiconTargetFolderPath: './resources'
        },


        //----------------------------------------------------------
        // Assets - Fonts
        //----------------------------------------------------------
        fonts: {
            // Relative to 'App Root'.
            fontFolderPath: "./fonts",
            // ----
            // Iconfont Configs.
            // ----
            // Relative to `fontFolderPath`.
            iconfontFilePath: "./fonts/iconfont/**/*.svg",
            iconfontName: 'Ionicons', // The name of the generated font family.
            iconfontCssOptions: {
                // Need to be the same as another `fontName` inside `iconfontOptions`.
                fontName: 'Ionicons',
                // The path of the iconfont CSS file.
                // It is **relative** to the path of **FINAL `dest` copying folder defined by `gulp.dest()`**
                targetPath: '../styles/_icons.css',
                // The path of the target font file that **this generated CSS file** links to.
                // It is **relative** to the path of **THIS CSS file**.
                // NOTE: Be sure to add the FINAL "/" here - `gulp-iconfont-css"` version "2.0.0"
                fontPath: '../fonts/',
                // Be sure to have the chosen engine installed.
                engine: 'lodash'
            },
            iconfontOptions: {
                fontName: 'Ionicons',
                appendUnicode: true,
                formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
                timestamp: Math.round(Date.now()/1000) // recommended to get consistent builds when watching files
            },

            // ----
            // Fonts Copying
            // ----
            mainFontFilePaths: [
                // Relative to `fontFolderPath`.
                './**/*.+(eot|ttf|woff)'
            ],
            // The "relative" path to "root path" of the **vendor folder**.
            vendorFontFilePaths: [
                // Relative to 'Vendor Root'.
                'ionic/fonts/**/*.+(eot|ttf|woff)'
            ]
        },

        //----------------------------------------------------------
        // HTMLs
        //----------------------------------------------------------

        htmls: {
            indexFile: "index.html",

            // ----
            // `index.html` Injection
            // ----
            injectMainCssFilename: "main*.css",
            // It depends on the exact format added to `index.html`.
            // e.g. In `<!-- inject:app-styles:css --><!-- endinject -->`, the "tag" is "app-styles".
            injectMainCssTag: "main-styles",
            injectVendorCssFilename: "vendor*.css",
            injectVendorCssTag: "vendor-styles",

            injectMainScriptFilename: "main*.js",
            injectMainScriptTag: "main-scripts",
            injectVendorScriptFilename: "vendor*.js",
            injectVendorScriptTag: "vendor-scripts",

            // ----
            // Template HTMLs
            // ----
            templatesFilePaths: [
                // Relative to `App Root`.
                './**/templates/**/*.html'
            ],
            // Relative to `App Root`.
            templatesFolderPath: "./templates",
            // ----
            // Angular Templates Cache
            //
            // Once generated, it will be copied back to the `scripts` folder under `app` folder.
            // for further **Script Process**
            //
            // {#link https://docs.angularjs.org/api/ng/service/$templateCache}
            // ----
            templatesCacheUsed: true,
            templatesCacheFilename: "templates.cache.js",
            templatesCacheOptions: {
                module:'templatesCache',
                standalone:true,
                root: ''
            }
        },

        //----------------------------------------------------------
        // Styles
        //----------------------------------------------------------
        styles: {
            // Relative to 'App Root'.
            styleFolderPath: "./styles",
            styleFilePaths: [
                './**/*.scss'
            ],
            mainSassFile: "main.scss",
            mainCssFIle: "main.css",  // The filename of "output" CSS file generated from the "main Sass" file.

            // ----
            // Options for autoprefixer.
            // {@llink https://github.com/postcss/autoprefixer}.
            // ----
            autoprefixerOptions: {
                browsers: [
                    'last 1 Chrome version',
                    'last 3 iOS versions',
                    'last 3 Android versions'
                ],
                cascade: false
            },

            // ----
            // @deprecated, use `gulp-cssnano` instead.
            // Options for minfyCSS
            // Based on "CleanCSS" - {@link https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api}.
            // ----
            minifyCssOptions: {
                compatibility: 'ie8'
            },

            // ----
            // Vendor CSS
            // ----
            vendorCssFile: "vendor.css", // The filename of "output" CSS file generated from all the vendors' CSS files.
            vendorCssFilePaths: [
                // Relative to 'Vendor Root'.
                'ionic/css/ionic.css'
            ]
        },


        //----------------------------------------------------------
        // Scripts
        //----------------------------------------------------------
        scripts: {
            // Relative to 'App Root'.
            scriptFolderPath: "./scripts",

            // ----
            // Main Scripts
            // ----
            mainScriptFile: "main.js", // The filename of "output" JS file for all app's code.
            mainScriptFilePaths: [
                // Relative to 'scriptFolderPath'.
                './app.module.js'
            ],

            // ----
            // Vendor Scripts
            // ----
            vendorScriptFile: "vendor.js", // The filename of "output" JS file generated from all the vendors' JS files.
            //
            // The list of bundles that are loaded as "External" from the **app bundle**.
            //
            // If the libraries are from `browserify-shim`, the "name" should from the `browser` section of `package.json` file.
            //
            // {@link http://www.5neo.be/browserify-multiple-bundles-with-gulp-on-angularjs-project}
            vendorScriptFileBrowserifyRequireBundle: [
                'angular',
                'angular-ui-router',
                'angular-sanitize',
                'angular-animate',

                // `browserify-shim` libraries
                'ionic-js',
                'ionic-angular',
                'ng-cordova'
            ],

            // ----
            // Lint Scripts
            // ----
            // The path array to the JS files that needs to be screened.
            lintFilePaths: [
                // // Relative to 'scriptFolderPath'.
                './**/*.js',
                '!./**/*.cache.js', // exclude "templates cache" file
                '!./**/*.+(unit|spec).js' // exclude "templates cache" file
            ],
            // By default, it uses `jshint-stylish`.
            // If `true`, it uses `gulp-jshint-html-reporter`.
            // Make sure the related **Gulp Plugin** is installed.
            useLintHTMLReporter: true,
            // Relative to 'Project Root'.
            lintHTMLOutputFilename: './reports/jshint-output.html',
            // If need to also do scripts screening on Gulp Tasks files.
            needLintGulpTaskFiles: true,
            // Relative to 'Project Root'.
            gulpFilePath: "./gulpfile/**/*.js"

        },


        //----------------------------------------------------------
        // Express Server
        //----------------------------------------------------------
        serve: {
            port: "8800"
        },


        //----------------------------------------------------------
        // Testing
        //----------------------------------------------------------
        tests: {
            karmaConfigFilePath: './tests/karma.conf.js',
            protractorConfigFilePath: './tests/protractor.conf.js',
            protractorTargetFilePaths: [
                './**/tests/**/*.spec.js'
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
                return pathBuilder.pathResolve(this.root.base, additionalPath);
            }
            return this.root.base;
        },

        /**
         * Get path for "app".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "app". If `additionalPath` is available, it returns the "combined' version.
         */
        getAppPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return pathBuilder.pathResolve(path.join(this.root.base, this.root.app), additionalPath);
            }
            return pathBuilder.pathResolve(this.root.base, this.root.app);
        },

        /**
         * Get path for "dev".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "dev". If `additionalPath` is available, it returns the "combined' version.
         */
        getDevPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return pathBuilder.pathResolve(path.join(this.root.base, this.root.dev), additionalPath);
            }
            return pathBuilder.pathResolve(this.root.base, this.root.dev);
        },

        /**
         * Get path for "build".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "build". If `additionalPath` is available, it returns the "combined' version.
         */
        getBuildPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return pathBuilder.pathResolve(path.join(this.root.base, this.root.build), additionalPath);
            }
            return pathBuilder.pathResolve(this.root.base, this.root.build);
        },

        /**
         * Get path for "vendor".
         *
         * @param additionalPath (optional) An extra path.
         * @returns {*} The path of "build". If `additionalPath` is available, it returns the "combined' version.
         */
        getVendorPath: function(additionalPath) {
            if (additionalPath !== undefined) {
                return pathBuilder.pathResolve(path.join(this.root.base, this.root.vendor), additionalPath);
            }
            return pathBuilder.pathResolve(this.root.base, this.root.vendor);
        },

        /**
         * get path of "manifest" file. .
         *
         * @returns {*} The path of "manifest".
         */
        getManifestFile: function() {
            return this.getAppPath(this.appInfo.manifest);
        }

    };

    module.exports = config;

}());
