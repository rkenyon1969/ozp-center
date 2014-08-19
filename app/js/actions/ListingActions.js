'use strict';

var Reflux = require('reflux');
var ListingApi = require('../data/Listing').ListingApi;

var fetchNewArrivals    = Reflux.createAction(),
    newArrivalsFetched  = Reflux.createAction(),
    fetchMostPopular    = Reflux.createAction(),
    mostPopularFetched  = Reflux.createAction(),
    search              = Reflux.createAction(),
    searchCompleted     = Reflux.createAction();

fetchNewArrivals.listen(function () {
    ListingApi.getNewArrivals().then(function (listings) {
        newArrivalsFetched(listings);
    });
});

fetchMostPopular.listen(function () {
    ListingApi.getMostPopular().then(function (listings) {
        mostPopularFetched(listings);
    });
});

search.listen(function (options) {
    ListingApi.search(options).then(function (listings) {
        searchCompleted(listings);
    });
});

module.exports = {
    fetchNewArrivals    : fetchNewArrivals,
    newArrivalsFetched  : newArrivalsFetched,
    fetchMostPopular    : fetchMostPopular,
    mostPopularFetched  : mostPopularFetched,
    search              : search,
    searchCompleted     : searchCompleted
};