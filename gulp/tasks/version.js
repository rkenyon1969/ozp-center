var gulp  = require('gulp');
var shell = require('gulp-shell');
var pjson = require('../../package.json');

var build_dir = 'dist';

gulp.task('version', shell.task([
    'echo "Version: ' + pjson.version + '" > ' + build_dir + '/version.txt',
    'echo "Git hash: " >> ' + build_dir + '/version.txt',
    'git rev-parse HEAD >> ' + build_dir + '/version.txt',
    'echo Date: >> ' + build_dir + '/version.txt',
    'git rev-parse HEAD | xargs git show -s --format=%ci >> ' + build_dir + '/version.txt'
]));
