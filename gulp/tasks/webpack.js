var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var WebpackDevServer = require('webpack-dev-server');

gulp.task("webpack:prod", function (callback) {
    var prodConfig = Object.create(webpackConfig);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(prodConfig, function (err, stats) {
        if(err) throw new gutil.PluginError("webpack:prod", err);
        gutil.log("[webpack:prod]", stats.toString({
            colors: true
        }));
        callback();
    });

});
