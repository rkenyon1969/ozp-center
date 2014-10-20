'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var newArrivalsFetched = ListingActions.newArrivalsFetched;
var mostPopularFetched = ListingActions.mostPopularFetched;
var featuredFetched = ListingActions.featuredFetched;
var searchCompleted = ListingActions.searchCompleted;
var changeLogsFetched = ListingActions.changeLogsFetched;
var ownedListingsFetched = ListingActions.ownedListingsFetched;

var cache = {};
var changeLogCache = {};
var listingsByOwnerCache = {};

function updateCache (listings) {
    listings.forEach(function (listing) {
        cache[listing.id()] = listing;

        listing.owners.forEach(function(owner) {
debugger;
            var cachedListings = listingsByOwnerCache[owner.username] || [];

            cachedListings = cachedListings.filter(function(l) {
                return l.id !== listing.id();
            });

            listingsByOwnerCache[owner.username] = cachedListings.concat([listing]);
        });
    });
}

var GlobalListingStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(newArrivalsFetched, updateCache);
        this.listenTo(mostPopularFetched, updateCache);
        this.listenTo(featuredFetched, updateCache);
        this.listenTo(searchCompleted, updateCache);
        this.listenTo(changeLogsFetched, function (id, changeLogs) {
            changeLogCache[id] = changeLogs;
            this.trigger();
        });
        this.listenTo(ownedListingsFetched, function(ownedListings) {
            updateCache(ownedListings);
        });
    },

    getById: function (id) {
        return cache[id];
    },

    getChangeLogs: function (id) {
        return changeLogCache[id] || [];
    }

});

module.exports = GlobalListingStore;
