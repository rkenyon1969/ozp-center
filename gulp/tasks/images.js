var gulp = require('gulp');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');

// images to flatten into dist/**/ directory
var IMAGE_PATHS = [
    'node_modules/select2/*'
];

gulp.task('images', function () {
    var filterImages = filter('**/*.{png,gif}');

    return gulp.src(IMAGE_PATHS)
        .pipe(filterImages)
        .pipe(flatten())
        .pipe(gulp.dest('dist/images'));
});
