'use strict';

var { ListingApi } = require('../webapi/Listing');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('ozp-react-commons/constants');
var OzpAnalytics = require('../analytics/ozp-analytics');
var ListingActions = require('../actions/ListingActions');
var PaginatedListingsStore = require('../stores/PaginatedListingsStore');

function updateListingProperty(propName, value, listing) {
    var data = _.cloneDeep(listing);
    data[propName] = value;
    ListingActions.save(data);
}

var setEnabled = updateListingProperty.bind(null, 'isEnabled');

ListingActions.fetchAllListings.listen(function (filter) {
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
});

ListingActions.fetchCounts.listen(function () {
    ListingApi
        .getCounts()
        .then(_.partial(ListingActions.fetchCountsCompleted));
});

ListingActions.fetchAllChangeLogs.listen(function (profile, filter) {

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
});

ListingActions.fetchStorefrontListings.listen(function() {
    ListingApi.getStorefrontListings().then(ListingActions.fetchStorefrontListingsCompleted);
});


ListingActions.fetchById.listen(function (id) {
    ListingApi.getById(id).then(ListingActions.fetchByIdCompleted);
});

(function() {
    var mostRecentSearch;

    /**
     * Add *'s to all of the non-quoted terms that don't already end in a *
     */
    function processQuery(queryString) {
        var matches = queryString && queryString.match(/"[^"]*"|\S+/g),
            processedMatches = matches && matches.map(
                m => /[""\*]$/.test(m) ? m : m + '*'   
            );

        return processedMatches && processedMatches.join(' ');
    }

    ListingActions.search.listen(function (options) {
        var queryString = processQuery((options.queryString)) || '',
            apiOptions = Object.assign({}, options, {
                queryString: queryString
            });

        //deep object comparison
        if (!_.isEqual(apiOptions, mostRecentSearch)) {
            mostRecentSearch = apiOptions;

            ListingApi.search(apiOptions)
                .then(function(searchResults) {
                    //drop out-of-order results
                    if (_.isEqual(mostRecentSearch, apiOptions)) {
                        ListingActions.searchCompleted(searchResults);
                    }
                });
        }
    });
})();


ListingActions.fetchChangeLogs.listen(function (listingId) {
    ListingApi.getChangeLogs(listingId)
        .then(ListingActions.fetchChangeLogsCompleted.bind(null, listingId));
});


ListingActions.fetchOwnedListings.listen(function (profile) {
    ListingApi.getOwnedListings(profile).then(ListingActions.fetchOwnedListingsCompleted);
});


ListingActions.fetchReviews.listen(function (listing) {
    ListingApi.fetchReviews(listing.id)
        .then(ListingActions.fetchReviewsCompleted.bind(null, listing.id));
});

ListingActions.saveReview.listen(function (listing, review) {
    ListingApi.saveReview(listing.id, review)
        .then(function (response) {
            ListingActions.fetchById(listing.id);
            ListingActions.fetchReviews(listing);
            ListingActions.saveReviewCompleted(listing, response);
            OzpAnalytics.trackListingReview(listing.title, listing.agencyShort);
        })
        .fail(ListingActions.saveReviewFailed);
});

ListingActions.deleteReview.listen(function (listing, review) {
    ListingApi.deleteReview(listing.id, review.id)
        .then(function () {
            ListingActions.fetchById(listing.id);
            ListingActions.fetchReviews(listing);
            ListingActions.deleteReviewCompleted(listing, review);
        })
        .fail(_.partial(ListingActions.deleteReviewFailed, listing, review));
});

ListingActions.launch.listen(function (listing) {
    OzpAnalytics.trackEvent('Applications', listing.title, listing.agencyShort);
    window.open(listing.launchUrl);
});

ListingActions.save.listen(function (data) {
    var isNew = !data.id;

    if (isNew) { OzpAnalytics.trackListingCreation(data.title, data.agency); }

    if (/\s/g.test(data.launchUrl)) { data.launchUrl = data.launchUrl.replace(/ /g,"%20"); }

    ListingApi
        .save(data)
        .then(ListingActions.saveCompleted.bind(null, isNew))
        .then(ListingActions.listingChangeCompleted)
        .fail(ListingActions.saveFailed);
});

ListingActions.reject.listen(function (listingId, description) {
    ListingApi.rejectListing(listingId, description)
        .then(ListingActions.rejectCompleted)
        .then(ListingActions.listingChangeCompleted);
});

ListingActions.enable.listen(setEnabled.bind(null, true));
ListingActions.disable.listen(setEnabled.bind(null, false));

ListingActions.approve.listen(function (listing) {
    OzpAnalytics.trackListingApproval(listing.title, listing.agencyShort);
    updateListingProperty('approvalStatus', 'APPROVED', listing);
});

ListingActions.approveByOrg.listen(function (listing) {
    OzpAnalytics.trackListingOrgApproval(listing.title, listing.agencyShort);
    updateListingProperty('approvalStatus', 'APPROVED_ORG', listing);
});

ListingActions.deleteListing.listen(function (listing) {
    ListingApi.del(listing.id)
        .then(ListingActions.deleteListingCompleted.bind(null, listing))
        .then(ListingActions.listingChangeCompleted)
        .fail(ListingActions.deleteListingFailed);
});

ListingActions.setFeatured.listen(updateListingProperty.bind(null, 'isFeatured'));
