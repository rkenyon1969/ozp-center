var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'fonts', 'images', 'webpack:prod']);
