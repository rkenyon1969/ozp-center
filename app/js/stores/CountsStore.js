'use strict';

var Reflux = require('reflux');
var ListingActions = require('../actions/ListingActions');

var _countsCache = {};

var CountsStore = Reflux.createStore({

    /**
    * Update local cache when new data is fetched
    **/
    init: function () {
        this.listenTo(ListingActions.fetchCountsCompleted, this.onFetchCountsCompleted);
        this.listenTo(ListingActions.listingChangeCompleted, this.onListingChangeCompleted);
    },

    onFetchCountsCompleted: function (response) {
        if (Object.getOwnPropertyNames(_countsCache).length === 0) {
            _countsCache = response;
        }
        this.trigger();
    },

    onListingChangeCompleted: function () {
        // clear cache when any listing is updated
        _countsCache = {};
    },

    getCounts: function () {
        return _countsCache;
    }

});

module.exports = CountsStore;
