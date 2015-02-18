'use strict';

var Reflux = require('reflux');
var ProfileSearchActions = require('../actions/ProfileSearchActions');
var _ = require('../utils/_');

var ProfileSearchStore = Reflux.createStore({
    searchTerm: null,
    profiles: [],

    listenables: ProfileSearchActions,

    onSearchCompleted: function(searchTerm, profiles) {
        this.searchTerm = searchTerm;
        this.profiles = profiles;

        this.doTrigger();
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    getDefaultData: function() {
        return _.pick(this, 'searchTerm', 'profiles');
    }
});

module.exports = ProfileSearchStore;
