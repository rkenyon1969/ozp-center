'use strict';

var Reflux = require('reflux');
var ListingApi = require('../data/Listing').ListingApi;

var Actions = Reflux.createActions([
    'fetchNewArrivals', 'newArrivalsFetched',
    'fetchMostPopular', 'mostPopularFetched',
    'search', 'searchCompleted',
    'launch',
    'bookmark', 'bookmarked'
]);


Actions.fetchNewArrivals.listen(function () {
    ListingApi
        .getNewArrivals()
        .then(function (listings) {
            Actions.newArrivalsFetched(listings);
        });
});

Actions.fetchMostPopular.listen(function () {
    ListingApi
        .getMostPopular()
        .then(function (listings) {
            Actions.mostPopularFetched(listings);
        });
});

Actions.search.listen(function (options) {
    ListingApi
        .search(options)
        .then(function (listings) {
            Actions.searchCompleted(listings);
        });
});

Actions.launch.listen(function (listing) {
    window.open(listing.launchUrl());
});

Actions.bookmark.listen(function (listing) {
    window.alert('bookmark listing...');
});

module.exports = Actions;