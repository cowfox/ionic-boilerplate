/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/23/16
 */

'use strict';

// General `requires`
var angular = require("angular");
require("ionic");

// App `basic` modules
var appConstants = require('./app.constant');
var appConfig = require('./app.config');
var appRouter = require('./app.router');
var appRun = require('./app.run');

// App `functional` modules
require('./dash/dash.module');
require('./chats/chats.module');
require('./account/account.module');

// create and bootstrap application
var app_requires = [
    'ionic',

    // App funcitonal modules
    'app.dash',
    'app.chats',
    'app.account'
];
var appModule = angular.module('ionicBoilerplate', app_requires);

appModule.run(appRun);
appModule.config(appConstants);
appModule.config(appRouter);
appModule.config(appConfig);

module.exports = appModule;
