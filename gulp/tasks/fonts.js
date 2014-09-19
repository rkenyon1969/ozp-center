var gulp = require('gulp');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');

// web font paths, flattened into dist/fonts directory
var FONT_PATHS = [
    'node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*',
    'bower_components/font-awesome/fonts/**/*',
    'bower_components/ubuntu-font/**/*'
];

gulp.task('fonts', function () {
    var filterFonts = filter('**/*.{eot,svg,ttf,woff}');

    return gulp.src(FONT_PATHS)
        .pipe(filterFonts)
        .pipe(flatten())
        .pipe(gulp.dest('dist/fonts'));
});
