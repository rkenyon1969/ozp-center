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
        this.listenTo(newArrivalsFetched, this.onNewArrivalsFetched);
        this.listenTo(mostPopularFetched, this.onMostPopularFetched);
        this.listenTo(featuredFetched, this.onFeaturedFetched);
        this.listenTo(searchCompleted, this.onSearchCompleted);
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