'use strict';

var Reflux = require('reflux');
var { ListingApi } = require('../webapi/Listing');
var ProfileApi = require('ozp-react-commons/api/Profile');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('ozp-react-commons/constants');
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
    fetchAllChangeLogs: function (profile, filter) {

        var PaginatedChangeLogStore = require('../stores/PaginatedChangeLogStore');

        var paginatedList = PaginatedChangeLogStore.getChangeLogs(),
            opts = {},
            nextLink;

        if (paginatedList) {
            paginatedList.expectPage();
            nextLink = paginatedList.nextLink;
        }
        else {
            _.assign(opts, {
                offset: 0,
                max: PAGINATION_MAX
            });
        }

        ListingApi
            .getAllChangeLogs(profile, nextLink, opts)
            .then(function (response) {
                ListingActions.fetchAllChangeLogsCompleted(filter, response);
            });
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
        var queryString = options.queryString;

        // append '*'
        if (!/\*$/.test(queryString)) {
            queryString += '*';
        }

        ListingApi
            .search(
                Object.assign({}, options, {
                    queryString: queryString
                })
            ).then(ListingActions.searchCompleted);
    },

    fetchChangeLogs: function (listingId) {
        ListingApi.getChangeLogs(listingId).then(ListingActions.fetchChangeLogsCompleted.bind(null, listingId));
    },

    fetchOwnedListings: function (profile) {
        ListingApi.getOwnedListings(profile).then(ListingActions.fetchOwnedListingsCompleted);
    },

    fetchReviews: function (listing) {
        ListingApi.fetchReviews(listing.id)
            .then(ListingActions.fetchReviewsCompleted.bind(null, listing.id));
        if(typeof(listing.title) !== 'undefined') { OzpAnalytics.trackListingReview(listing.title);}
    },
    saveReview: function (listing, review) {
        OzpAnalytics.trackListingReview(listing.title);
        ListingApi.saveReview(listing.id, review)
            .then(function (response) {
                ListingActions.fetchById(listing.id);
                ListingActions.fetchReviews(listing);
                ListingActions.saveReviewCompleted(listing, response);
            })
            .fail(ListingActions.saveReviewFailed);
    },
    deleteReview: function (listing, review) {
        ListingApi.deleteReview(listing.id, review.id)
            .then(function () {
                ListingActions.fetchById(listing.id);
                ListingActions.fetchReviews(listing);
                ListingActions.deleteReviewCompleted(listing, review);
            })
            .fail(_.partial(ListingActions.deleteReviewFailed, listing, review));
    },

    launch: function (listing) {
        OzpAnalytics.trackEvent('Applications', listing.title);
    },
    addToLibrary: function (listing) {
        ProfileApi
            .addToLibrary({
                listing: {
                    id: listing.id
                }
            })
            .then(ListingActions.addToLibraryCompleted.bind(null, listing));
        OzpAnalytics.trackEvent('Favorited Applications', listing.title);
    },
    removeFromLibrary: function (listing) {
        ProfileApi
            .removeFromLibrary(listing)
            .then(ListingActions.removeFromLibraryCompleted.bind(null, listing));
    },
    save: function (data) {
        var isNew = !data.id;

        if (isNew) { OzpAnalytics.trackListingCreation(data.title); }

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
    approve: function (listing) {
        OzpAnalytics.trackListingApproval(listing.title);
        updateListingProperty('approvalStatus', 'APPROVED', listing);
    },
    approveByOrg: function (listing) {
        OzpAnalytics.trackListingOrgApproval(listing.title);
        updateListingProperty('approvalStatus', 'APPROVED_ORG', listing);
    },
    setFeatured: updateListingProperty.bind(null, 'isFeatured')
});

ListingActions.listingChangeCompleted = Reflux.createAction();


module.exports = ListingActions;
