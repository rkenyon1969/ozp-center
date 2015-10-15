'use strict';

var Reflux = require('reflux');
var PaginatedList = require('../utils/PaginatedList');
var ListingActions = require('../actions/ListingActions');

var _paginatedListByFilter = {};
var _unPaginatedListByFilter = {};
var collectAll = false;
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
        var unPaginatedList = _unPaginatedListByFilter[key];

        if (paginatedList) {
            paginatedList.receivePage(response);
            unPaginatedList.receivePage(response);
        }
        else {
            _paginatedListByFilter[key] = new PaginatedList(response);
            _unPaginatedListByFilter[key] = new PaginatedList(response);
        }

        if (_unPaginatedListByFilter[key].hasMore) {
            collectAll = true;
            ListingActions.fetchAllListings(filter);
        } else {
            collectAll = false;
        }
        this.trigger();
    },

    onListingChangeCompleted: function () {
        // clear cache when any listing is updated
        _paginatedListByFilter = {};
        _unPaginatedListByFilter = {};
    },

    getListingsByFilter: function (filter) {
        if (collectAll) {
            return _unPaginatedListByFilter[filterKey(filter)];
        } else {
            return _paginatedListByFilter[filterKey(filter)];
        }
    },

    getAllListingsByFilter: function (filter) {
        return _unPaginatedListByFilter[filterKey(filter)];
    },

});

module.exports = PaginatedListingsStore;
