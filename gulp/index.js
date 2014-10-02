var fs = require('fs');
var path = require("path");

// Filters out non-javascript files. Prevents
// accidental inclusion of possible hidden files
var tasks = fs.readdirSync('./gulp/tasks/').filter(function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
});

tasks.forEach(function(task) {
    require('./tasks/' + task);
});
