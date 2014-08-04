var gulp = require('gulp');
var path = require('path');

var VENDOR_PATHS = [
    'es5-shim/es5-sham.js',
    'es5-shim/es5-shim.js',
    'gridster/dist/jquery.gridster.css',
    'jquery-ui/themes/base/jquery.ui.resizable.css'
];

gulp.task('vendor', function() {
    var paths;
    paths = VENDOR_PATHS.map(function(p) {
        return path.resolve("bower_components", p);
    });
    paths = paths.concat(VENDOR_PATHS.map(function(p) {
        return path.resolve("node_modules", p);
    }));
    return gulp.src(paths).pipe(gulp.dest('dist/assets/vendor'));
});
