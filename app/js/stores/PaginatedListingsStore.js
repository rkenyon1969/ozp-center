'use strict';

var Reflux = require('reflux');
var PaginatedList = require('../utils/PaginatedList');
var ListingActions = require('../actions/ListingActions');

var _paginatedListByFilter = {};
var filterKey = function (filter) {
    return JSON.stringify(filter);
};

var PaginatedListingsStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchAllListingsCompleted, this.onFetchAllListingsCompleted);
        this.listenTo(ListingActions.listingChangeCompleted, this.onListingChangeCompleted);
    },

    onFetchAllListingsCompleted: function (filter, response) {

        var key = filterKey(filter);
        var paginatedList = _paginatedListByFilter[key];

        if (paginatedList) {
            paginatedList.receivePage(response);
        } else {
            _paginatedListByFilter[key] = new PaginatedList(response);
        }

        this.trigger();
    },

    onListingChangeCompleted: function () {
        // clear cache when any listing is updated
        _paginatedListByFilter = {};
    },

    filterChange: function (filter) {
        if (_paginatedListByFilter[ filterKey ( filter ) ] ) {
            this.trigger();
        } else {
            ListingActions.fetchAllListings(filter);
        }
    },

    getListingsByFilter: function (filter) {
        return _paginatedListByFilter[filterKey(filter)];
    }
});

module.exports = PaginatedListingsStore;
