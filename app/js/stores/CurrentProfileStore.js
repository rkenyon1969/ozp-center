'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');

var ProfileActions = require('../actions/ProfileActions');
var ProfileApi = require('../webapi/Profile');

/**
 * A store for information about the profile that is currently
 * being viewed.  Note that this is different from the SelfStore, which
 * always holds info about the currently logged in user
 */
var CurrentProfileStore = Reflux.createStore({
    ownedListings: [],
    profile: null,

    listenables: ProfileActions,

    getDefaultData: function() {
        return _.pick(this, 'profile', 'ownedListings');
    },

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    onFetchOwnedListings: function(profileId) {
        var me = this;
        ProfileApi.getOwnedListings(profileId).then(function(listings) {
            me.ownedListings = listings;
            me.doTrigger();
        });
    },

    onFetchProfile: function(profileId) {
        var me = this;
        ProfileApi.getProfile(profileId).then(function(profile) {
            me.profile = profile;
            me.doTrigger();
        });
    }
});

module.exports = CurrentProfileStore;
