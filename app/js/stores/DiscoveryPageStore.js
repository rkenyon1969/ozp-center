'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');
var newArrivalsFetched = ListingActions.newArrivalsFetched;
var mostPopularFetched = ListingActions.mostPopularFetched;
var featuredFetched = ListingActions.featuredFetched;
var searchCompleted = ListingActions.searchCompleted;

var _newArrivals = [];
var _mostPopular = [];
var _featured = [];
var _searchResults = [];

var DiscoveryPageStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(newArrivalsFetched, function (newArrivals) {
            _newArrivals = newArrivals;
            this.trigger();
        });

        this.listenTo(mostPopularFetched, function (mostPopular) {
            _mostPopular = mostPopular;
            this.trigger();
        });

        this.listenTo(featuredFetched, function (featured) {
            _featured = featured;
            this.trigger();
        });

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

    getFeatured: function () {
        return _featured;
    },

    getSearchResults: function () {
        return _searchResults;
    }

});

module.exports = DiscoveryPageStore;