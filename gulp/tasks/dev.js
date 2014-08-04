var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var path = require('path');
var tiny_lr = require('tiny-lr');
var connect_lr = require('connect-livereload');
var express = require('express');

var httpPort = 4000;
var liveReloadPort = 35730;

var createServers = function(port, lrport) {
    var app, lr;
    lr = tiny_lr();
    lr.listen(lrport, function() {
        return gutil.log("LiveReload listening on", lrport);
    });
    app = express();
    app.use(connect_lr({
        port: lrport
    }));
    app.use(express["static"](path.resolve("dist")));
    app.listen(port, function() {
        return gutil.log("HTTP server listening on", port);
    });
    return {
        lr: lr,
        app: app
    };
};

gulp.task('dev', ['build'], function() {
    var servers;
    servers = createServers(httpPort, liveReloadPort);
    gulp.watch(['app/**/*'], function(evt) {
        return gulp.run('build');
    });
    return gulp.watch(['dist/**/*'], function(evt) {
        gutil.log(gutil.colors.cyan(evt.path), 'changed');
        return servers.lr.changed({
            body: {
                files: [evt.path]
            }
        });
    });
});
