var gulp = require('gulp');

gulp.task('copy', function() {
    return gulp.src([
        'app/**/*',
        '!app/js',
        '!app/js/**/*',
        '!app/styles',
        '!app/styles/**/*']
        )
        .pipe(gulp.dest('dist'));
});
