var gulp = require('gulp');

gulp.task('copy:mocks', function() {
    return gulp.src(['app/js/mocks/*.*',]).pipe(gulp.dest('dist/mocks'));
});

gulp.task('copy', ['copy:mocks'], function() {
    return gulp.src([
        'app/**/*',
        '!app/js',
        '!app/js/**/*',
        '!app/styles',
        '!app/styles/**/*']
        ).pipe(gulp.dest('dist'));
});
