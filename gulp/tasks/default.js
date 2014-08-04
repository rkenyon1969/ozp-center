var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function() {
    gutil.log("********************************************************");
    gutil.log("* gulp                       (development build)");
    gutil.log("* gulp clean                 (rm /dist)");
    gutil.log("* gulp build --production    (production build)");
    gutil.log("* gulp dev                   (build and run dev server)");
    return gutil.log("********************************************************");
});
