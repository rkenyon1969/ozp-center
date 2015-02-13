'use strict';

var Reflux = require('reflux');
var { SelfApi } = require('../webapi/Self');
var createActions = require('../utils/createActions');

var SelfActions = createActions({
    fetchLibrary() {
        SelfApi.getLibrary()
            .then(SelfActions.fetchLibraryCompleted);
    },

    fetchSelf() {
        SelfApi.getSelf()
            .done(SelfActions.fetchSelfCompleted)
            .fail(SelfActions.fetchSelfFailed);
    }
});

SelfActions.selfLoaded = Reflux.createAction();

module.exports = SelfActions;
