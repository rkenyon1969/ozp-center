'use strict';

var Reflux = require('reflux');
var { ListingApi } = require('../webapi/Listing');
var { ProfileApi } = require('../webapi/Profile');
var _ = require('../utils/_');
var OzpAnalytics = require('../analytics/ozp-analytics');

var Actions = Reflux.createActions([
    'fetchNewArrivals', 'newArrivalsFetched',
    'fetchMostPopular', 'mostPopularFetched',
    'fetchFeatured', 'featuredFetched',
    'search', 'searchCompleted', 'approveByOrg', 'approve',
    'fetchById', 'fetchedById',
    'fetchChangeLogs', 'changeLogsFetched',
    'fetchOwnedListings', 'ownedListingsFetched',
    'launch', 'reject', 'rejected',
    'addToLibrary', 'addedToLibrary',
    'removeFromLibrary', 'removedFromLibrary',
    'save', 'saved', 'saveFailed', 'enable', 'disable', 'setFeatured'
]);

function updateListingProperty(propName, value, listing) {
    var data = _.cloneDeep(listing);
    data[propName] = value;
    Actions.save(data);
}

var setEnabled = updateListingProperty.bind(null, 'isEnabled');

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
    OzpAnalytics.trackEvent('Applications', listing.title);
    window.open(listing.launchUrl);
});

Actions.addToLibrary.listen(function (listing) {
    ProfileApi
        .addToLibrary({
            listing: {
                id: listing.id
            }
        })
        .then(Actions.addedToLibrary.bind(null, listing));
    OzpAnalytics.trackEvent('Favorited Applications', listing.title);
});

Actions.removeFromLibrary.listen(function (listing) {
    ProfileApi
        .removeFromLibrary(listing)
        .then(Actions.removedFromLibrary.bind(null, listing));
    OzpAnalytics.trackEvent('Favorited Applications', listing.title);
});

Actions.save.listen(function (data) {
    var isNew = !data.id;
    ListingApi
        .save(data)
        .then(Actions.saved.bind(null, isNew))
        .fail(Actions.saveFailed);
});

Actions.reject.listen(function (listingId, description) {
    ListingApi.rejectListing(listingId, description).then(Actions.rejected);
});

Actions.enable.listen(setEnabled.bind(null, true));
Actions.disable.listen(setEnabled.bind(null, false));

Actions.approveByOrg.listen(updateListingProperty.bind(null, 'approvalStatus', 'APPROVED_ORG'));
Actions.approve.listen(updateListingProperty.bind(null, 'approvalStatus', 'APPROVED'));

Actions.setFeatured.listen(updateListingProperty.bind(null, 'isFeatured'));

module.exports = Actions;
