'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');

var _newArrivals = [];
var _mostPopular = [];
var _featured = [];
var _searchResults = [];

var DiscoveryPageStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchNewArrivalsCompleted, this.onNewArrivalsFetched);
        this.listenTo(ListingActions.fetchMostPopularCompleted, this.onMostPopularFetched);
        this.listenTo(ListingActions.fetchFeaturedCompleted, this.onFeaturedFetched);
        this.listenTo(ListingActions.searchCompleted, this.onSearchCompleted);
    },

    onNewArrivalsFetched: function (newArrivals) {
        _newArrivals = newArrivals;
        this.trigger();
    },

    getNewArrivals: function () {
        return _newArrivals;
    },

    onMostPopularFetched: function (mostPopular) {
        _mostPopular = mostPopular;
        this.trigger();
    },

    getMostPopular: function () {
        return _mostPopular;
    },

    onFeaturedFetched: function (featured) {
        _featured = featured;
        this.trigger();
    },

    getFeatured: function () {
        return _featured;
    },

    onSearchCompleted: function (searchResults) {
        _searchResults = searchResults;
        this.trigger();
    },

    getSearchResults: function () {
        return _searchResults;
    }

});

module.exports = DiscoveryPageStore;
