/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

/*
    The list of **Required** libraries loaded as `External`.

    Here, the list should be **identical** to the **lib list** under `vendorScriptFileBrowserifyRequireBundle`
    in `Gulp config file`.

    The list of libraries are loaded from your local **NPM** folder.
    For those `browserify-shim` libraries, be sure to use the name defined in `browser` section.
 */
var angular = require("angular");
require("angular-ui-router");
require("angular-sanitize");
require("angular-animate");
// `browserify-shim` libraries
require("ionic-js");
require("ionic-angular");
require("ng-cordova");
/*
    END of `External` libraries
 */

// App `basic` modules
var appConstants = require('./app.constant');
var appConfig = require('./app.config');
var appRouter = require('./app.router');
var appRun = require('./app.run');

// App `functional` modules
require('./dash/dash.module');
require('./chats/chats.module');
require('./account/account.module');
// Use "templateCache"
require('./templates.cache');

// create and bootstrap application
var app_requires = [
    'ionic',
    'ui.router',
    'ngSanitize',
    'ngAnimate',

    'ngCordova',

    // Templates Caches
    'templatesCache',

    // App functional modules
    'app.dash',
    'app.chats',
    'app.account'
];
var appModule = angular.module('app', app_requires);

appModule.run(appRun);
appModule.config(appConstants);
appModule.config(appRouter);
appModule.config(appConfig);

module.exports = appModule;
