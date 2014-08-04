var gulp = require('gulp');

gulp.task('build', ['webpack', 'sass', 'copy', 'vendor']);
