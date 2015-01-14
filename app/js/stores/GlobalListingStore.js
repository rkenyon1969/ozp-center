'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var {listingCreated} = require('../actions/CreateEditActions');
var Listing = require('../webapi/Listing').Listing;

var _listingsCache = {};
var _listingsByOwnerCache = {};
var _allListings = [];
var _changeLogsCache = {};
var _itemCommentsCache = {};

function updateCache (listings) {
    listings.forEach(function (listing) {
        var prev = _listingsCache[listing.id];

        if (prev) {
            listing.changeLogs = prev.changeLogs;
        }

        _listingsCache[listing.id] = listing;

        listing.owners.forEach(function (owner) {
            var cachedListings = _listingsByOwnerCache[owner.username] || [];

            cachedListings = cachedListings.filter(function (l) {
                return l.id !== listing.id;
            });

            _listingsByOwnerCache[owner.username] = cachedListings.concat([listing]);
        });
    });
}

var GlobalListingStore = Reflux.createStore({

    /**
    * Update local listingsCache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchNewArrivalsCompleted, updateCache);
        this.listenTo(ListingActions.fetchMostPopularCompleted, updateCache);
        this.listenTo(ListingActions.fetchFeaturedCompleted, updateCache);
        this.listenTo(ListingActions.searchCompleted, updateCache);
        this.listenTo(ListingActions.fetchAllListingsCompleted, function (filter, response) {
            var listings = response.getItemAsList();
            updateCache(listings);
            _allListings = (_allListings || []).concat(listings);
            this.trigger();
        });
        this.listenTo(ListingActions.fetchChangeLogsCompleted, function (id, changeLogs) {
            _changeLogsCache[id] = changeLogs;
            this.trigger();
        });
        this.listenTo(ListingActions.fetchItemCommentsCompleted, function (id, itemComments) {
            _itemCommentsCache[id] = itemComments;
            this.trigger();
        });
        this.listenTo(ListingActions.fetchOwnedListingsCompleted, updateCache);
        this.listenTo(ListingActions.saveCompleted, function (isNew, data) {
            var listing = new Listing(data);
            updateCache([listing]);
            if (isNew) {
                listingCreated(listing);
            }
            ListingActions.fetchChangeLogs(listing.id);
            this.trigger();
        });
        this.listenTo(ListingActions.rejectCompleted, function (rejection) {
            var listing = _listingsCache[rejection.listingId];
            listing.currentRejection= rejection;
            listing.approvalStatus = 'REJECTED';
            ListingActions.fetchChangeLogs(listing.id);
            this.trigger();
        });
        this.listenTo(ListingActions.fetchByIdCompleted, function (data) {
            updateCache([new Listing(data)]);
            this.trigger();
        });
    },

    getById: function (id) {
        if (!_listingsCache[id]) {
            ListingActions.fetchById(id);
            return null;
        }
        return _listingsCache[id];
    },

    getCache: function () {
        return _listingsCache;
    },

    getByOwner: function (profile) {
        return _listingsByOwnerCache[profile.username] || [];
    },

    getAllListings: function () {
        return _allListings;
    },

    getChangeLogsForListing: function (id) {
        if(!_changeLogsCache[id]) {
            ListingActions.fetchChangeLogs(id);
            return null;
        }
        return _changeLogsCache[id];
    },

    getItemCommentsForListing: function (id) {
        if(!_itemCommentsCache[id]) {
            ListingActions.fetchItemComments(id);
            return null;
        }
        return _itemCommentsCache[id];
    }

});

module.exports = GlobalListingStore;
