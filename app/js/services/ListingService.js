'use strict';

var { ListingApi } = require('../webapi/Listing');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('ozp-react-commons/constants');
var { WEBTOP_URL } = require('ozp-react-commons/OzoneConfig');
var OzpAnalytics = require('../analytics/ozp-analytics');
var ListingActions = require('../actions/ListingActions');
var LibraryActions = require('../actions/LibraryActions');
var PaginatedListingsStore = require('../stores/PaginatedListingsStore');
var LibraryStore = require('../stores/LibraryStore');
var SelfStore = require('ozp-react-commons/stores/SelfStore');

function updateListingProperty(propName, value, listing) {
    var data = _.cloneDeep(listing);
    data[propName] = value;
    ListingActions.save(data);
}

var setEnabled = updateListingProperty.bind(null, 'isEnabled');

ListingActions.fetchAllListings.listen(function (filter) {
    // work around circular dependency

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

ListingActions.fetchNewArrivals.listen(function () {
    ListingApi.getNewArrivals().then(ListingActions.fetchNewArrivalsCompleted);
});

ListingActions.fetchMostPopular.listen(function () {
    ListingApi.getMostPopular().then(ListingActions.fetchMostPopularCompleted);
});

ListingActions.fetchFeatured.listen(function () {
    ListingApi.getFeatured().then(ListingActions.fetchFeaturedCompleted);
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
        var matches = queryString.match(/"[^"]*"|\S+/g),
            processedMatches = matches && matches.map(
                m => /["\*]$/.test(m) ? m : m + '*'
            );

        return processedMatches && processedMatches.join(' ');
    }

    ListingActions.search.listen(function (options) {
        var queryString = processQuery((options.queryString || ''));

        if (queryString && mostRecentSearch !== queryString) {
            mostRecentSearch = queryString;

            ListingApi
                .search(
                    Object.assign({}, options, {
                        queryString: queryString
                    })
                ).then(function(searchResults) {
                    //drop out-of-order results
                    if (mostRecentSearch === queryString) {
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
    if(typeof(listing.title) !== 'undefined') { OzpAnalytics.trackListingReview(listing.title);}
});

ListingActions.saveReview.listen(function (listing, review) {
    OzpAnalytics.trackListingReview(listing.title);
    ListingApi.saveReview(listing.id, review)
        .then(function (response) {
            ListingActions.fetchById(listing.id);
            ListingActions.fetchReviews(listing);
            ListingActions.saveReviewCompleted(listing, response);
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

//grouping of launch code
(function() {
    function getLaunchInWebtop(profileData) {
        var profile = profileData.currentUser;
        return profile ? profile.launchInWebtop : null;
    }

    function doWebtopLaunch(uuid) {
        var url = `${WEBTOP_URL}#/launchApp/${encodeURIComponent(uuid)}`;
        window.open(url);
    }

    var launchInWebtop = getLaunchInWebtop(SelfStore.getDefaultData()),
        library = LibraryStore.getDefaultData(),                //user's current library
        pendingLaunches = [];   //list of UUIDs waiting to be bookmarked before being launched.

    SelfStore.listen(function(profileData) {
        launchInWebtop = getLaunchInWebtop(profileData);
    });

    //when the library store updates, check to see if any of the listings that are pending
    //launch have been bookmarked
    LibraryStore.listen(function(lib) {
        library = lib;

        //split the current pending list into those that have now been bookmarked and
        //those that still haven't
        var isBookmarked = uuid => _.find(lib, { listing: { uuid: uuid } }),
            { stillPending, bookmarked } =
                _.groupBy(pendingLaunches,
                    uuid => isBookmarked(uuid) ? 'bookmarked' : 'stillPending');

        pendingLaunches = stillPending || [];
        if (bookmarked) { bookmarked.forEach(doWebtopLaunch); }
    });

    ListingActions.launch.listen(function (listing) {
        OzpAnalytics.trackEvent('Applications', listing.title);

        if (launchInWebtop) {
            //only bookmarked listings can be launched into webtop.  If this listing is
            //not yet bookmarked, bookmark it and add it to the pending list so it can
            //be launched when bookmarking completes
            if (_.contains(library.map(e => e.listing.id), listing.id)) {
                doWebtopLaunch(listing.uuid);
            }
            else {
                pendingLaunches = pendingLaunches.concat(listing.uuid);
                LibraryActions.addToLibrary(listing);
            }
        }
        else {
            window.open(listing.launchUrl);
        }
    });

})();

ListingActions.save.listen(function (data) {
    var isNew = !data.id;

    if (isNew) { OzpAnalytics.trackListingCreation(data.title); }

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
    OzpAnalytics.trackListingApproval(listing.title);
    updateListingProperty('approvalStatus', 'APPROVED', listing);
});

ListingActions.approveByOrg.listen(function (listing) {
    OzpAnalytics.trackListingOrgApproval(listing.title);
    updateListingProperty('approvalStatus', 'APPROVED_ORG', listing);
});

ListingActions.deleteListing.listen(function (listing) {
    ListingApi.del(listing.id)
        .then(ListingActions.deleteListingCompleted.bind(null, listing))
        .then(ListingActions.listingChangeCompleted)
        .fail(ListingActions.deleteListingFailed);
});

ListingActions.setFeatured.listen(updateListingProperty.bind(null, 'isFeatured'));
