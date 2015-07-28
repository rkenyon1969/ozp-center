'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');

var _newArrivals = [];
var _mostPopular = [];
var _featured = [];
var _searchResults = [];
var _nextOffset = 0;

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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

    getNextOffset: function () {
        return _nextOffset;
    },

    onSearchCompleted: function (searchResults) {
        var items = searchResults._response;

        // FIXME:  Makes the ugly, but currently accurate, assumption
        // that if a previous link exists then these new results should
        // be appended to the old results.
        if (searchResults.prevLink()) {
            _searchResults.push.apply(_searchResults, items);
        } else {
            _searchResults = items;
        }
        _nextOffset = (searchResults.nextLink()) ?
            getParameterByName(searchResults.nextLink(), "offset") : 0;

        this.trigger();
    },

    getSearchResults: function () {
        return _searchResults;
    }

});

module.exports = DiscoveryPageStore;
