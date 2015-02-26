var gulp = require('gulp');
var preprocess = require('gulp-preprocess');

gulp.task('config', function() {
    return gulp.src(['node_modules/ozp-react-commons/app/OzoneConfig.js'])
        .pipe(preprocess({
            context: { APP_TITLE: process.env.APP_TITLE || 'OZONE Marketplace'}
        }))
        .pipe(gulp.dest('dist'));
});
