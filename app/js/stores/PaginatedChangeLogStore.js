'use strict';

var Reflux = require('reflux');
var PaginatedList = require('../utils/PaginatedList');
var ListingActions = require('../actions/ListingActions');

var _paginatedList;

var PaginatedChangeLogStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchAllChangeLogsCompleted, this.onFetchAllChangeLogsCompleted);
        // this.listenTo(ListingActions.listingChangeCompleted, this.onListingChangeCompleted);
    },

    onFetchAllChangeLogsCompleted: function (filter, response) {
        var paginatedList = _paginatedList;
        if(paginatedList) {
            paginatedList.receivePage(response);
        } else {
            _paginatedList = new PaginatedList(response);
        }

        this.trigger();
    },

    getChangeLogs: function () {
        return _paginatedList;
    }

});

module.exports = PaginatedChangeLogStore;
