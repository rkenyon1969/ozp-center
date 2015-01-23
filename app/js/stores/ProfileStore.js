'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = require('../actions/ProfileActions');
var ListingActions = require('../actions/ListingActions');
var { UserRole } = require('../constants');
var { Listing } = require('../webapi/Listing');
var { selfLoaded } = ProfileActions;
var { ORG_STEWARD, ADMIN } = UserRole;

var _library = [];
var _self = null;

var selfIsAdmin = () => UserRole[_self.highestRole] >= ADMIN;
var selfIsOwner = (listing) => listing.owners.some(u => u.username === _self.username);
var selfIsOrgSteward = (org) => UserRole[_self.highestRole] >= ORG_STEWARD && _self.stewardedOrganizations.some(o => o === org);

var ProfileStore = Reflux.createStore({

    listenables: Object.assign({},
        _.pick(ProfileActions, 'fetchLibraryCompleted', 'fetchSelfCompleted'),
        _.pick(ListingActions, 'addToLibraryCompleted', 'removeFromLibraryCompleted')
    ),

    onFetchLibraryCompleted: function (library) {
        _library = library;
        this.trigger({library: _library});
    },

    onFetchSelfCompleted: function (self) {
        _self = self;
        _self.isAdmin = selfIsAdmin();
        _self.isOrgSteward = selfIsOrgSteward;
        this.trigger({currentUser: _self});
        selfLoaded();
    },

    onAddToLibraryCompleted: function (listing) {
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

    onRemoveFromLibraryCompleted: function (listing) {
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
        return listing && (selfIsAdmin() || selfIsOwner(listing) || selfIsOrgSteward(listing.agency));
    }

});

module.exports = ProfileStore;
