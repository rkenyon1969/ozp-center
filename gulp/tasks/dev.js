var gulp = require('gulp');

gulp.task('dev', ['sass', 'copy', 'vendor', 'fonts'], function () {
    gulp.run('webpack:dev');

    gulp.watch(['app/styles/**/*'], function (evt) {
        return gulp.run('sass');
    });
});