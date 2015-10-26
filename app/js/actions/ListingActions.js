'use strict';

var Reflux = require('reflux');
var createActions = require('../utils/createActions');

//callbacks that used to be here have been moved to ListingService
var ListingActions = createActions({
    fetchAllListings: null,
    fetchAllListingsAtOnce: null,
    fetchCounts: null,
    fetchAllChangeLogs: null,
    fetchStorefrontListings: null,

    fetchById: null,

    search: null,

    fetchChangeLogs: null,

    fetchOwnedListings: null,

    fetchReviews: null,
    saveReview: null,
    deleteReview: null,

    launch: null,
    save: null,
    reject: null,
    enable: null,
    disable: null,
    approve: null,
    approveByOrg: null,
    setFeatured: null,
    deleteListing: null
});

ListingActions.listingChangeCompleted = Reflux.createAction();


module.exports = ListingActions;
