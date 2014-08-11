var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var replace = require('gulp-replace');

var sassConfig = {
    includePaths: ['app/styles'],
    precision: 10
};

gulp.task('sass', function() {
    return gulp.src('app/styles/main.scss')
        .pipe(sass(sassConfig).on('error', gutil.log))
        .pipe(gulp.env.production ? minifyCSS() : gutil.noop())
        .pipe(gulp.env.production ? rev() : gutil.noop())
        .pipe(replace('../bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
        .pipe(replace('../bower_components/font-awesome/fonts', 'fonts'))
        .pipe(gulp.dest('dist/assets'));
});
