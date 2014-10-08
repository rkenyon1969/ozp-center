var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

var options = {};
options.branch = 'gh-pages';

gulp.task('deploy', function () {
    gulp.src('./dist/**/*')
        .pipe(deploy(options));
});