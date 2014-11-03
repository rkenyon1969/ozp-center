'use strict';

var Router = require('react-router');
var Navigation = Router.Navigation;
var Reflux = require('reflux');
var ListingApi = require('../webapi/Listing').ListingApi;
var ProfileApi = require('../webapi/Profile').ProfileApi;

var Actions = Reflux.createActions([
    'fetchNewArrivals', 'newArrivalsFetched',
    'fetchMostPopular', 'mostPopularFetched',
    'fetchFeatured', 'featuredFetched',
    'search', 'searchCompleted', 'approve',
    'fetchById', 'fetchedById',
    'fetchChangeLogs', 'changeLogsFetched',
    'fetchOwnedListings', 'ownedListingsFetched',
    'launch', 'reject', 'rejected',
    'addToLibrary', 'addedToLibrary',
    'removeFromLibrary', 'removedFromLibrary',
    'save', 'saved', 'saveFailed', 'enable', 'disable'
]);

function setEnabled(value, listing) {
    var data = listing.clone().toObject();
    data.isEnabled = value;
    Actions.save(data);
}

Actions.fetchNewArrivals.listen(function () {
    ListingApi.getNewArrivals().then(Actions.newArrivalsFetched);
});

Actions.fetchMostPopular.listen(function () {
    ListingApi.getMostPopular().then(Actions.mostPopularFetched);
});

Actions.fetchFeatured.listen(function () {
    ListingApi.getFeatured().then(Actions.featuredFetched);
});

Actions.fetchById.listen(function (id) {
    ListingApi.getById(id).then(Actions.fetchedById);
});

Actions.search.listen(function (options) {
    ListingApi.search(options).then(Actions.searchCompleted);
});

Actions.fetchChangeLogs.listen(function (listingId) {
    ListingApi.getChangeLogs(listingId).then(Actions.changeLogsFetched.bind(null, listingId));
});

Actions.fetchOwnedListings.listen(function (profile) {
    ListingApi.getOwnedListings(profile).then(Actions.ownedListingsFetched);
});

Actions.launch.listen(function (listing) {
    window.open(listing.launchUrl());
});

Actions.addToLibrary.listen(function (listing) {
    ProfileApi
        .addToLibrary({
            listing: {
                id: listing.id()
            }
        })
        .then(Actions.addedToLibrary.bind(null, listing));
});

Actions.removeFromLibrary.listen(function (listing) {
    ProfileApi
        .removeFromLibrary(listing)
        .then(Actions.removedFromLibrary.bind(null, listing));
});

Actions.save.listen(function (data) {
    ListingApi
        .save(data)
        .then(Actions.saved)
        .fail(Actions.saveFailed);
});

Actions.reject.listen(function (listingId, description) {
    ListingApi.rejectListing(listingId, description).then(Actions.listingRejected);
});

Actions.enable.listen(setEnabled.bind(null, true));
Actions.disable.listen(setEnabled.bind(null, false));

Actions.approve.listen(function (listing) {
    var data = listing.clone().toObject();
    data.approvalStatus = 'APPROVED';
    Actions.save(data);
});

module.exports = Actions;
