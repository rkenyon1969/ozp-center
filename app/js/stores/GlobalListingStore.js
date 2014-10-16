'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var newArrivalsFetched = ListingActions.newArrivalsFetched;
var mostPopularFetched = ListingActions.mostPopularFetched;
var featuredFetched = ListingActions.featuredFetched;
var searchCompleted = ListingActions.searchCompleted;
var changeLogsFetched = ListingActions.changeLogsFetched;

var cache = {};
var changeLogCache = {};

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
        this.listenTo(changeLogsFetched, function (id, changeLogs) {
            changeLogCache[id] = changeLogs;
            this.trigger();
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
