var gulp = require('gulp');

gulp.task('svg', function () {
    console.log('svg');
    return gulp.src('node_modules/icons/dist/css/svg/*.svg')
        .pipe(gulp.dest('dist/assets/svg'));
});