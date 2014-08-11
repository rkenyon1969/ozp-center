var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'vendor', 'fonts', 'webpack:prod']);
