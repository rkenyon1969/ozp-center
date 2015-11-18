'use strict';

var Reflux = require('reflux');
var PaginatedList = require('../utils/PaginatedList');
var ListingActions = require('../actions/ListingActions');

var _unpaginatedListByFilter = {};
var filterKey = function (filter) {
    return JSON.stringify(filter);
};

var UnpaginatedListingsStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchAllListingsAtOnceCompleted, this.onFetchAllListingsAtOnceCompleted);
        this.listenTo(ListingActions.listingChangeCompleted, this.onListingChangeCompleted);
    },

    onFetchAllListingsAtOnceCompleted: function (filter, response) {
        var key = filterKey(filter);
        _unpaginatedListByFilter[key] = new PaginatedList(response);
        this.trigger();
    },

    onListingChangeCompleted: function () {
        // clear cache when any listing is updated
        _unpaginatedListByFilter = {};
    },

    filterChange: function (filter) {
        if ( _unpaginatedListByFilter[ filterKey ( filter ) ]) {
            this.trigger();
        } else {
            ListingActions.fetchAllListingsAtOnce(filter);
        }
    },

    getListingsByFilter: function (filter) {
        return _unpaginatedListByFilter[filterKey(filter)];
    }
});

module.exports = UnpaginatedListingsStore;
