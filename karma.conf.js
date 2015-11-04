'use strict';

var webpackOptions = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            // including es5-shim for PhantomJS
            'bower_components/es5-shim/es5-shim.js',
            'node_modules/ozp-react-commons/app/OzoneConfig.js', //default configs
            'app/js/__tests__/main.js'
        ],
        preprocessors: {
            'app/js/__tests__/main.js': ['webpack']
        },
        webpack: {
            cache: true,
            resolve: webpackOptions.resolve,
            // devtool: 'inline-source-map',
            module: {
                loaders: webpackOptions.module.loaders,
                noParse: webpackOptions.module.noParse
            },
            plugins: webpackOptions.plugins
        },
        webpackServer: {
            stats: {
                colors: true
            }
        },
        exclude: [],
        port: 8080,
        logLevel: config.LOG_INFO,
        colors: true,
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        reporters: ['mocha'],
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,
        singleRun: true,
        plugins: [
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack',
            'karma-mocha'
        ]

    });
};
