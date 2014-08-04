var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var rev = require('gulp-rev');

var sassConfig = {
    includePaths: ['app/styles']
};

gulp.task('sass', function() {
    return gulp.src('app/styles/main.scss')
                .pipe(sass(sassConfig).on('error', gutil.log))
                .pipe(gulp.env.production ? minifyCSS() : gutil.noop())
                .pipe(gulp.env.production ? rev() : gutil.noop())
                .pipe(gulp.dest('dist/assets'));
});
