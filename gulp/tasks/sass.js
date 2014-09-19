var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var replace = require('gulp-replace');

var sassConfig = {
    includePaths: ['app/styles'],
    precision: 10
};

gulp.task('sass', function() {
    return gulp.src('app/styles/main.scss')
        .pipe(sass(sassConfig).on('error', gutil.log))
        .pipe(gulp.env.production ? minifyCSS() : gutil.noop())
        .pipe(replace('../node_modules/bootstrap-sass/assets/fonts/bootstrap', 'fonts'))
        .pipe(replace('../bower_components/font-awesome/fonts', 'fonts'))
        .pipe(replace('../bower_components/ubuntu-font', 'fonts'))
        .pipe(gulp.dest('dist/assets'));
});
