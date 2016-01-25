'use strict';

module.exports = {

    // BaseDir
    srcDir: './www/',

    // Scripts
    scripts: {
        src: [
            '!www/js/bundles/**/*',
            'www/js/**/*.js'
        ]
    },

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