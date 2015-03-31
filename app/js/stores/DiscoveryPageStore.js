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
        this.listenTo(ListingActions.fetchStorefrontListingsCompleted,
                this.onStorefrontListingsFetched);

        this.listenTo(ListingActions.searchCompleted, this.onSearchCompleted);
    },

    onStorefrontListingsFetched: function (storefrontListings) {
        _newArrivals = storefrontListings.newArrivals;
        _mostPopular = storefrontListings.mostPopular;
        _featured = storefrontListings.featured;

        this.trigger();
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

    onSearchCompleted: function (searchResults) {
        _searchResults = searchResults;
        this.trigger();
    },

    getSearchResults: function () {
        return _searchResults;
    }

});

module.exports = DiscoveryPageStore;
