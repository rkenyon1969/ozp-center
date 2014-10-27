var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var cssImport = require('gulp-cssimport');

var sassConfig = {
    includePaths: ['app/styles'],
    precision: 10
};

gulp.task('sass', function() {
    return gulp.src('app/styles/main.scss')
        .pipe(sass(sassConfig).on('error', gutil.log))
        .pipe(cssImport('main.css'))
        .pipe(replace('../bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
        .pipe(replace('../bower_components/font-awesome/fonts', 'fonts'))
        .pipe(replace('../bower_components/ubuntu-font', 'fonts'))
        .pipe(replace('select2.png', '../images/select2.png'))
        .pipe(replace('select2x2.png', '../images/select2x2.png'))
        .pipe(replace('select2-spinner.gif', '../images/select2-spinner.gif'))
        .pipe(gulp.env.production ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest('dist/assets'));
});
