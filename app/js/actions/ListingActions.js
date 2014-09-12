'use strict';

var Reflux = require('reflux');
var ListingApi = require('../api/Listing').ListingApi;
var ProfileApi = require('../api/Profile').ProfileApi;

var Actions = Reflux.createActions([
    'fetchNewArrivals', 'newArrivalsFetched',
    'fetchMostPopular', 'mostPopularFetched',
    'fetchFeatured', 'featuredFetched',
    'search', 'searchCompleted',
    'launch',
    'addToLibrary', 'addedToLibrary',
    'save', 'listingSaved'
]);


Actions.fetchNewArrivals.listen(function () {
    ListingApi.getNewArrivals().then(Actions.newArrivalsFetched);
});

Actions.fetchMostPopular.listen(function () {
    ListingApi.getMostPopular().then(Actions.mostPopularFetched);
});

Actions.fetchFeatured.listen(function () {
    ListingApi.getFeatured().then(Actions.featuredFetched);
});

Actions.search.listen(function (options) {
    ListingApi.search(options).then(Actions.searchCompleted);
});

Actions.launch.listen(function (listing) {
    window.open(listing.launchUrl());
});

Actions.addToLibrary.listen(function (listing) {
    ProfileApi
        .addToLibrary({
            serviceItem: {
                id: listing.id()
            }
        })
        .then(Actions.addedToLibrary);
});

Actions.save.listen(function (data) {
    ListingApi.save(data).then(Actions.listingSaved);
});

module.exports = Actions;
