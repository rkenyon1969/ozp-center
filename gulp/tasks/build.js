var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'config', 'fonts', 'images', 'webpack:prod']);
