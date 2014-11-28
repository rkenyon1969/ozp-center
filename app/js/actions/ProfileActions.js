'use strict';

var Reflux = require('reflux');
var { ProfileApi } = require('../webapi/Profile');

var Actions = Reflux.createActions([
    'fetchLibrary', 'libraryFetched', 'selfLoaded',
    'fetchSelf', 'selfFetched', 'fetchSelfFailed'
]);

Actions.fetchLibrary.listen(function () {
    ProfileApi.getLibrary()
        .then(Actions.libraryFetched);
});

Actions.fetchSelf.listen(function () {
    ProfileApi.getSelf()
        .done(Actions.selfFetched)
        .fail(Actions.fetchSelfFailed);
});


module.exports = Actions;
