'use strict';

var Reflux = require('reflux');
var ProfileApi = require('../api/Profile').ProfileApi;

var Actions = Reflux.createActions([
    'fetchLibrary', 'libraryFetched'
]);

Actions.fetchLibrary.listen(function () {
    ProfileApi.getLibrary().then(Actions.libraryFetched);
});


module.exports = Actions;
