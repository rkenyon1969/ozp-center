var gulp  = require('gulp');
var shell = require('gulp-shell');
var pjson = require('../../package.json');

var build_dir = 'dist';

gulp.task('tarDistDate', shell.task([
	'./packageRelease.sh center-debug dist',
]));
