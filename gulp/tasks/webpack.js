var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var WebpackDevServer = require('webpack-dev-server');

gulp.task("webpack:prod", function (callback) {
    var prodConfig = Object.create(webpackConfig);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
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

gulp.task("webpack:dev", function (callback) {
    var devConfig = Object.create(webpackConfig);
    devConfig.devtool = "eval";
    devConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(devConfig), {
        publicPath: "/" + devConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/dist");
    });
});