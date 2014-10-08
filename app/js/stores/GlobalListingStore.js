'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var newArrivalsFetched = ListingActions.newArrivalsFetched;
var mostPopularFetched = ListingActions.mostPopularFetched;
var featuredFetched = ListingActions.featuredFetched;
var searchCompleted = ListingActions.searchCompleted;

var cache = {};

function updateCache (listings) {
    listings.forEach(function (listing) {
        cache[listing.id()] = listing;
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
    },

    getById: function (id) {
        return cache[id];
    }

});

module.exports = GlobalListingStore;