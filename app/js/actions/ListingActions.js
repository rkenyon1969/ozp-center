'use strict';

var Reflux = require('reflux');

var ListingApi = require('../data/Listing').ListingApi;

var fetchNewArrivals = Reflux.createAction();
var newArrivalsFetched = Reflux.createAction();

var fetchMostPopular = Reflux.createAction();
var mostPopularFetched = Reflux.createAction();

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

module.exports = {
    fetchNewArrivals: fetchNewArrivals,
    newArrivalsFetched: newArrivalsFetched,
    fetchMostPopular: fetchMostPopular,
    mostPopularFetched: mostPopularFetched
};