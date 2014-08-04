var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config.js");

if (gulp.env.production) {
    webpackConfig.plugins = webpackConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());
    webpackConfig.output.filename = "main-[hash].js";
}

var execWebpack = function(config) {
    return webpack(config, function(err, stats) {
        if (err)
            throw new gutil.PluginError("execWebpack", err);
    });
};

gulp.task('webpack', function(callback) {
    execWebpack(webpackConfig);
    return callback();
});
