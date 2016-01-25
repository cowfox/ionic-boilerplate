'use strict';

exports.config = {
    allScriptsTimeout: 20000,
    baseUrl: 'http://localhost:8100',

    specs: [
        // We are going to make this file in a minute
        '../**/tests/**/*.spec.js'
    ],

    capabilities: {
        name: 'Protractor Tests',
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-web-security']
        }
    },
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },

    onPrepare: function(){
        //browser.driver.get('http://localhost:3000');
    }
};