'use strict';

var Reflux = require('reflux');
var ProfileActions = require('../actions/ProfileActions');

var _stewards;

var ProfileSearchStore = Reflux.createStore({

    init: function() {
        this.listenTo(ProfileActions.fetchOrgStewardsCompleted, this.onFetchOrgStewardsCompleted);
    },

    onFetchOrgStewardsCompleted: function(data) {
        _stewards = data;

        this.trigger();
    },

    getOrgStewards: function() {
        return _stewards;
    }

});

module.exports = ProfileSearchStore;
