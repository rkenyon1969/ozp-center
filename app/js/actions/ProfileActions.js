'use strict';

var Reflux = require('reflux');
var { ProfileApi } = require('../webapi/Profile');
var createActions = require('../utils/createActions');

var ProfileActions = createActions({
    fetchLibrary: function () {
        ProfileApi.getLibrary()
            .then(ProfileActions.fetchLibraryCompleted);
    },

    fetchSelf: function () {
        ProfileApi.getSelf()
            .done(ProfileActions.fetchSelfCompleted)
            .fail(ProfileActions.fetchSelfFailed);
    }
});

ProfileActions.selfLoaded = Reflux.createAction();

module.exports = ProfileActions;
