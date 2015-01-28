'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');

var ProfileActions = require('../actions/ProfileActions');
var ProfileApi = require('../actions/ProfileApi');

/**
 * A store for information about the profile that is currently
 * being viewed.  Note that this is different from the SelfStore, which
 * always holds info about the currently logged in user
 */
var CurrentProfileStore = Reflux.createStore({
    ownedListings: [],
    profile: null,

    listenables: ProfileActions,

    doTrigger: function() {
        this.trigger(_.pick(this, 'profile', 'ownedListings'));
    },

    onFetchOwnedListings: function(profileId) {
        ProfileApi.getOwnedListings(profileId).then(function(listings) {
            this.ownedListings = listings;
            this.doTrigger();
        });
    },

    onFetchProfile: function(profileId) {
        ProfileApi.getProfile(profileId).then(function(profile) {
            this.profile = profile;
            this.doTrigger();
        });
    }
});

module.exports = CurrentProfileStore;
