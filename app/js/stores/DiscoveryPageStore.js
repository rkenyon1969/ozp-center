'use strict';

var Reflux              = require('reflux'),
    ListingActions      = require('../actions/ListingActions'),
    newArrivalsFetched  = ListingActions.newArrivalsFetched,
    mostPopularFetched  = ListingActions.mostPopularFetched,
    searchCompleted     = ListingActions.searchCompleted;

var _newArrivals     = [],
    _mostPopular     = [],
    _searchResults   = [];

var DiscoveryPageStore = Reflux.createStore({

    init: function () {
        // update cache on new data
        this.listenTo(newArrivalsFetched, function (newArrivals) {
            _newArrivals = newArrivals;
            this.trigger();
        });

        // update cache on new data
        this.listenTo(mostPopularFetched, function (mostPopular) {
            _mostPopular = mostPopular;
            this.trigger();
        });

        // update cache on new data
        this.listenTo(searchCompleted, function (searchResults) {
            _searchResults = searchResults;
            this.trigger();
        });
    },

    getNewArrivals: function () {
        return _newArrivals;
    },

    getMostPopular: function () {
        return _mostPopular;
    },

    getSearchResults: function () {
        return _searchResults;
    }

});

module.exports = DiscoveryPageStore;