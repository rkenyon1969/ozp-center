'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = _.pick(require('../actions/ProfileActions'), 'libraryFetched', 'selfFetched');
var ListingActions = _.pick(require('../actions/ListingActions'), 'addedToLibrary', 'removedFromLibrary');
var { selfLoaded } = require('../actions/ProfileActions');
var { UserRole } = require('../constants');
var { Listing } = require('../webapi/Listing');
var { ORG_STEWARD, ADMIN } = UserRole;

var _library = [];
var _self = null;

var selfIsAdmin = () => UserRole[_self.highestRole] >= ADMIN;
var selfIsOwner = listing => listing.owners.some(u => u.username === _self.username);

var ProfileStore = Reflux.createStore({

    listenables: Object.assign({}, ProfileActions, ListingActions),

    onLibraryFetched: function (library) {
        _library = library;
        this.trigger({library: _library});
    },

    onSelfFetched: function (self) {
        _self = self;
        _self.isAdmin = selfIsAdmin();
        this.trigger({currentUser: _self});
        selfLoaded();
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

    getCurrentUser: function () {
        return _self;
    },

    getDefaultData: function () {
        return {currentUser: _self, library: _library};
    },

    currentUserCanEdit: function (listing) {
        return listing && (selfIsAdmin() || selfIsOwner(listing));
    }

});

module.exports = ProfileStore;
