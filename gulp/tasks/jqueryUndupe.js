var gulp = require('gulp');
var shell = require('gulp-shell');

/*
  For reasons not yet understood, multiple versions of jQuery are loaded unless
  this copy of the library is removed before compilation. It has to do with the
  fact that both bower and npm are used, and the two package managers do not
  communicate. Using npm shrinkwrap inadvertently solved this problem, but
  we want to be able to use package.json as well, thus requiring this build
  step
 */

gulp.task('jqueryUndupe', shell.task([
  'rm -rf node_modules/ozp-react-commons/node_modules/jquery'
  ]));