'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = require('../actions/ProfileActions');
var { UserRole } = require('../constants');

var _library = [];
var _self = { isAdmin: false };

var ProfileStore = Reflux.createStore({

    listenables: _.pick(ProfileActions, ['libraryFetched', 'addedToLibrary', 'removedFromLibrary', 'selfFetched']),

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
                id: listing.id(),
                imageLargeUrl: listing.imageLargeUrl(),
                imageMediumUrl: listing.imageMediumUrl(),
                launchUrl: listing.launchUrl(),
                title: listing.title(),
                uuid: listing.uuid()
            }
        });
        this.trigger({library: _library});
    },

    onRemovedFromLibrary: function (listing) {
        var toRemove = _.find(_library, {
            listing: {
                id: listing.id()
            }
        });
        _library = _.without(_library, toRemove);
        this.trigger({library: _library});
    },

    isListingInLibrary: function (uuid) {
        return !!_.find(
            _.map(_library, function (libraryEntry) {
                return libraryEntry.listing;
            }),
            { uuid: uuid }
        );
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
