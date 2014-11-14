'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var newArrivalsFetched = ListingActions.newArrivalsFetched;
var mostPopularFetched = ListingActions.mostPopularFetched;
var featuredFetched = ListingActions.featuredFetched;
var searchCompleted = ListingActions.searchCompleted;
var changeLogsFetched = ListingActions.changeLogsFetched;
var ownedListingsFetched = ListingActions.ownedListingsFetched;
var listingRejected = ListingActions.rejected;
var listingSaved = ListingActions.saved;
var fetchChangeLogs = ListingActions.fetchChangeLogs;
var {listingCreated} = require('../actions/CreateEditActions');
var Listing = require('../webapi/Listing').Listing;

var _listingsCache = {};
var _changeLogCache = {};
var _listingsByOwnerCache = {};

function updateCache (listings) {
    listings.forEach(function (listing) {
        _listingsCache[listing.id()] = listing;

        listing.owners().forEach(function(owner) {
            var cachedListings = _listingsByOwnerCache[owner.username] || [];

            cachedListings = cachedListings.filter(function(l) {
                return l.id() !== listing.id();
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
        this.listenTo(newArrivalsFetched, updateCache);
        this.listenTo(mostPopularFetched, updateCache);
        this.listenTo(featuredFetched, updateCache);
        this.listenTo(searchCompleted, updateCache);
        this.listenTo(changeLogsFetched, function (id, changeLogs) {
            _changeLogCache[id] = changeLogs;
            this.trigger();
        });
        this.listenTo(ownedListingsFetched, updateCache);
        this.listenTo(listingSaved, function (data, id) {
            var listing = new Listing(data);
            updateCache([listing]);
            if (!id) {
                listingCreated(listing);
            }
            fetchChangeLogs(listing.id());
        });
        this.listenTo(listingRejected, function (rejection) {
            var listing = _listingsCache[rejection.listingId];
            listing.currentRejection(rejection);
            listing.approvalStatus('REJECTED');
            fetchChangeLogs(listing.id());
        });
        this.listenTo(ListingActions.fetchedById, function (data) {
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

    getChangeLogs: function (id) {
        return _changeLogCache[id] || [];
    },

    getByOwner: function(profile) {
        return _listingsByOwnerCache[profile.username] || [];
    }
});

module.exports = GlobalListingStore;
