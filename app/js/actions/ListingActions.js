'use strict';

var Reflux = require('reflux');
var { ListingApi } = require('../webapi/Listing');
var { SelfApi } = require('../webapi/Self');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('../constants');
var OzpAnalytics = require('../analytics/ozp-analytics');
var createActions = require('../utils/createActions');
var ListingActions;

function updateListingProperty(propName, value, listing) {
    var data = _.cloneDeep(listing);
    data[propName] = value;
    ListingActions.save(data);
}

var setEnabled = updateListingProperty.bind(null, 'isEnabled');

ListingActions = createActions({

    fetchAllListings: function (filter) {
        // work around circular dependency
        var PaginatedListingsStore = require('../stores/PaginatedListingsStore');

        var paginatedList = PaginatedListingsStore.getListingsByFilter(filter),
            opts = {},
            nextLink;

        if (paginatedList) {
            paginatedList.expectPage();
            nextLink = paginatedList.nextLink;
        }
        else {
            // remove undefined values
            _.forOwn(filter || {}, function (value, key) {
                if(value !== null) {
                    opts[key] = value;
                }
            });

            _.assign(opts, {
                offset: 0,
                max: PAGINATION_MAX
            });
        }

        ListingApi
            .getAllListings(nextLink, opts)
            .then(_.partial(ListingActions.fetchAllListingsCompleted, filter));
    },
    fetchNewArrivals: function () {
        ListingApi.getNewArrivals().then(ListingActions.fetchNewArrivalsCompleted);
    },
    fetchMostPopular: function () {
        ListingApi.getMostPopular().then(ListingActions.fetchMostPopularCompleted);
    },
    fetchFeatured: function () {
        ListingApi.getFeatured().then(ListingActions.fetchFeaturedCompleted);
    },

    fetchById: function (id) {
        ListingApi.getById(id).then(ListingActions.fetchByIdCompleted);
    },

    search: function (options) {
        ListingApi.search(options).then(ListingActions.searchCompleted);
    },

    fetchChangeLogs: function (listingId) {
        ListingApi.getChangeLogs(listingId).then(ListingActions.fetchChangeLogsCompleted.bind(null, listingId));
    },

    fetchOwnedListings: function (profile) {
        ListingApi.getOwnedListings(profile).then(ListingActions.fetchOwnedListingsCompleted);
    },

    fetchReviews: function (listingId) {
        ListingApi.getItemComments(listingId).then(ListingActions.fetchReviewsCompleted.bind(null, listingId));
    },
    saveReview: function (listingId, review) {
        ListingApi.saveReview(listingId, review)
            .then(function (response) {
                ListingActions.fetchById(listingId);
                ListingActions.fetchReviews(listingId);
                ListingActions.saveReviewCompleted(listingId, response);
            })
            .fail(ListingActions.saveReviewFailed);
    },
    deleteReview: function (listingId, reviewId) {
        ListingApi.deleteReview(listingId, reviewId)
            .then(function () {
                ListingActions.fetchById(listingId);
                ListingActions.fetchReviews(listingId);
                ListingActions.deleteReviewCompleted(listingId, reviewId);
            })
            .fail(ListingActions.deleteReviewFailed);
    },

    launch: function (listing) {
        OzpAnalytics.trackEvent('Applications', listing.title);
        window.open(listing.launchUrl);
    },
    addToLibrary: function (listing) {
        SelfApi
            .addToLibrary({
                listing: {
                    id: listing.id
                }
            })
            .then(ListingActions.addToLibraryCompleted.bind(null, listing));
        OzpAnalytics.trackEvent('Favorited Applications', listing.title);
    },
    removeFromLibrary: function (listing) {
        SelfApi
            .removeFromLibrary(listing)
            .then(ListingActions.removeFromLibraryCompleted.bind(null, listing));
        OzpAnalytics.trackEvent('Favorited Applications', listing.title);
    },
    save: function (data) {
        var isNew = !data.id;
        ListingApi
            .save(data)
            .then(ListingActions.saveCompleted.bind(null, isNew))
            .then(ListingActions.listingChangeCompleted)
            .fail(ListingActions.saveFailed);
    },
    reject: function (listingId, description) {
        ListingApi.rejectListing(listingId, description)
            .then(ListingActions.rejectCompleted)
            .then(ListingActions.listingChangeCompleted);
    },
    enable: setEnabled.bind(null, true),
    disable: setEnabled.bind(null, false),
    approve: updateListingProperty.bind(null, 'approvalStatus', 'APPROVED'),
    approveByOrg: updateListingProperty.bind(null, 'approvalStatus', 'APPROVED_ORG'),
    setFeatured: updateListingProperty.bind(null, 'isFeatured')
});

ListingActions.listingChangeCompleted = Reflux.createAction();


module.exports = ListingActions;
