var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'vendor', 'fonts', 'images', 'webpack:prod']);
