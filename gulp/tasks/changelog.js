var gulp = require('gulp');
var changelog = require('conventional-changelog');
var config = require('../../package.json');

gulp.task('changelog', function () {
    changelog({
        repository: config.repository.url,
        version: config.version
    }, function(err, log) {
        if (err) {
            throw err;
        }
        console.log('Changelog is written to CHANGELOG.md file.');
    });
});
