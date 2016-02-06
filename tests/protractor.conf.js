/***********************************************************
 *  \#\#\# Gulp Tasks - Protractor Config \#\#\#
 *
 * It is based on **Mocha**.
 *
 ***********************************************************/

(function () {
    "use strict";

    exports.config = {

        framework: 'mocha',
        mochaOpts: {
            // Increase it if getting `timeout`.
            timeout: 15000
        },

        allScriptsTimeout: 20000,

        // The address of a running selenium server.
        // NOTE: DO NOT enable it, otherwise Protractor cannot invoke `selenium server` automatically.
        //
        // "Please note that if you set seleniumAddress, the settings for
        // seleniumServerJar, seleniumPort, seleniumArgs, sauceUser and sauceKey will be ignored."
        //
        // {@link http://www.protractortest.org/#/server-setup#standalone-selenium-server}
        //seleniumAddress: 'http://localhost:4444/wd/hub',

        baseUrl: 'http://localhost:8800',

        onPrepare: function(){
            global.expect = require('chai').expect;
        },

        specs: [
            // Include all "e2e test" files.
            '../**/tests/**/*.spec.js'
        ],

        // Capabilities to be passed to the webdriver instance.
        capabilities: {
            name: 'Protractor Tests',
            // You can use other browsers
            // like firefox, phantoms, safari, IE (-_-)
            'browserName': 'chrome',
            'chromeOptions': {
                args: ['--disable-web-security']
            }
        }
        //multiCapabilities: [{
        //    browserName: 'chrome'
        //}]
    };

}());