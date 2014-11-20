'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = _.pick(require('../actions/ProfileActions'), 'libraryFetched', 'selfFetched');
var ListingActions = _.pick(require('../actions/ListingActions'), 'addedToLibrary', 'removedFromLibrary');
var { UserRole } = require('../constants');
var { Listing } = require('../webapi/Listing');

var _library = [];
var _self = { isAdmin: false };

var ProfileStore = Reflux.createStore({

    listenables: Object.assign({}, ProfileActions, ListingActions),

    onLibraryFetched: function (library) {
        _library = library;
        this.trigger({library: _library});
    },

    onSelfFetched: function (self) {
        _self = self;
        _self.isAdmin = UserRole[_self.highestRole] >= UserRole.ADMIN;
        this.trigger({currentUser: _self});
    },

    onAddedToLibrary: function (listing) {
        _library.push({
            folder: null,
            listing: {
                id: listing.id,
                imageLargeUrl: listing.imageLargeUrl,
                imageMediumUrl: listing.imageMediumUrl,
                launchUrl: listing.launchUrl,
                title: listing.title,
                uuid: listing.uuid
            }
        });
        this.trigger({library: _library});
    },

    onRemovedFromLibrary: function (listing) {
        var toRemove = _.find(_library, {
            listing: {
                id: listing.id
            }
        });
        _library = _.without(_library, toRemove);
        this.trigger({library: _library});
    },

    isListingInLibrary: function (uuid) {
        return _library.map(e => e.listing).some(l => l.uuid === uuid);
    },

    //normally we'd get the user via state, however this is still needed
    //in static methods for checking access rights to certain routes.
    getCurrentUser: function () {
        return _self;
    },

    getDefaultData: function () {
        return {currentUser: _self, library: _library};
    }

});

module.exports = ProfileStore;
