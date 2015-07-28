'use strict';

var $ = require('jquery');
var _ = require('../utils/_');
var OzpAnalytics = require('../analytics/ozp-analytics');
var PaginatedResponse  =require ('./responses/PaginatedResponse');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var FIELDS = [
    'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts', 'totalComments',
    'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4', 'height', 'width',
    'totalRate5','totalVotes', 'state', 'tags', 'type','uuid', 'requirements', 'singleton',
    'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'launchUrl', 'company', 'whatIsNew', 'owners', 'agency', 'agencyShort', 'currentRejection',
     'isEnabled', 'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls',
     'approvalStatus', 'isFeatured', 'smallIconId', 'largeIconId', 'bannerIconId',
     'featuredBannerIconId'
];

function Listing (json) {
    json = json || {};

    FIELDS.forEach((key) => {
        this[key] = json[key];
    });

    this.intents = this.intents || [];
    this.screenshots = this.screenshots || [];
    this.categories = this.categories || [];
    this.contacts = this.contacts || [];
    this.docUrls = this.docUrls || [];
    this.owners = this.owners || [];
    this.tags = this.tags || [];
    this.changeLogs = [];

    return this;
}

function parseList (response) {
    return new PaginatedResponse(response, Listing).getItemAsList();
}

function parseListToPaginatedResponse (response) {
    return new PaginatedResponse(response, Listing);
}

var delaySearch = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

var ListingApi = {

    getStorefrontListings: function() {
        /* jshint ignore:start */
        return $.getJSON(API_URL + '/api/storefront/')
            .then(resp => ({
                featured: resp.featured,
                newArrivals: resp.recent,
                mostPopular: resp.most_popular
            }));
        /* jshint ignore:end */
    },

    getFeatured: function () {
        return $.getJSON(API_URL + '/api/listing/search?isFeatured=true&sort=avgRate&order=DESC&max=24')
            .then(parseList);
    },

    getNewArrivals: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=approvedDate&order=DESC&max=24')
            .then(parseList);
    },

    getMostPopular: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=avgRate&order=DESC&max=36')
            .then(parseList);
    },
    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/listing/search?' + params)
            .then(function (response) {
                if (options.categories && options.categories.length > 0) {
                    for(var index = 0; index < options.categories.length; index++) {
                        OzpAnalytics.trackCategorization('Categorization', options.categories[index], response.total);
                    }
                }

                delaySearch(function(){
                    var queryString = options.search;
                    OzpAnalytics.trackSiteSearch('Application Search', queryString, response.total);
                }, 800);
                return response;
            })
            .then(parseListToPaginatedResponse);
    },

    getById: function (id) {
        return $.getJSON(API_URL + '/api/listing/' + id);
    },

    save: function (data) {
        var method = data.id ? 'PUT' : 'POST';
        var url = API_URL + '/api/listing';
        url = data.id ? url + '/' + data.id : url;

        return $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        });
    },

    del: function (id) {
        return $.ajax({
            type: 'DELETE',
            url: API_URL + '/api/listing/' + encodeURIComponent(id)
        });
    },

    getChangeLogs: function (id) {
        return $.getJSON(API_URL + '/api/listing/' + id + '/activity')
            .then((response) => new PaginatedResponse(response).getItemAsList());
    },

    fetchReviews: function (id) {
        return $.getJSON(API_URL + '/api/listing/' + id + '/itemComment')
            .then((response) => new PaginatedResponse(response).getItemAsList());
    },

    saveReview: function (listingId, review) {
        var url = `${API_URL}/api/listing/${listingId}/itemComment`,
            method = 'POST';
        if (review.id) {
            method = 'PUT';
            url += `/${review.id}`;
        }
        // default rate to 1 if not specified
        if (!review.rate) {
            review.rate = 1;
        }

        return $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(review),
            dataType: 'json',
            contentType: 'application/json'
        });
    },

    deleteReview: function (listingId, reviewId) {
        return $.ajax({
            type: 'DELETE',
            url: `${API_URL}/api/listing/${listingId}/itemComment/${reviewId}`,
            dataType: 'json',
            contentType: 'application/json'
        });
    },

    getOwnedListings: function (profile) {
        var id = profile ? profile.id : 'self';

        return $.getJSON(API_URL + '/api/self/profile/' + id + '/listing')
            .then(parseList);
    },

    rejectListing: function (id, description) {
        return $.ajax({
            type: 'POST',
            url: API_URL + '/api/listing/' + id + '/rejectionListing',
            data: JSON.stringify({description: description}),
            dataType: 'json',
            contentType: 'application/json'
        });
    },

    getAllListings: function (url, options) {
        if (!_.isString(url)) {
            url = API_URL + '/api/listing?' + $.param(options);
        }

        return $.getJSON(url).then((response) => {
            return new PaginatedResponse(response, Listing);
        });
    },

    getAllChangeLogs: function (profile, url, options) {
        if(!_.isString(url)) {
            if (profile.isAdmin() || profile.highestRole === 'ORG_STEWARD' ){
                url = API_URL + '/api/listing/activity?' + $.param(options);
            } else {
                url = API_URL + '/api/self/profile/' + profile.id + '/listing/activity?' + $.param(options);
            }
        }
        return $.getJSON(url).then((response) => {
            return new PaginatedResponse(response);
        });
    }
};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
