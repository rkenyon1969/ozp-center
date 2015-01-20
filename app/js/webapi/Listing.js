'use strict';

var $ = require('jquery');
var _ = require('../utils/_');
var OzpAnalytics = require('../analytics/ozp-analytics');
var PaginatedResponse  =require ('./responses/PaginatedResponse');

var FIELDS = [
    'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts', 'totalComments',
    'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4', 'height', 'width',
    'totalRate5','totalVotes', 'state', 'tags', 'type','uuid', 'requirements', 'singleton',
    'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'launchUrl', 'company', 'whatIsNew', 'owners', 'agency', 'currentRejection', 'isEnabled',
    'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls', 'approvalStatus',
    'isFeatured', 'smallIconId', 'largeIconId', 'bannerIconId', 'featuredBannerIconId'
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

var ListingApi = {

    getFeatured: function () {
        return $.getJSON(API_URL + '/api/listing/search?isFeatured=true&sort=avgRate&order=DESC&max=24')
            .then(parseList);
    },

    getNewArrivals: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=approvedDate&order=DESC&max=24')
            .then(parseList);
    },

    getMostPopular: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=avgRate&order=ASC&max=24')
            .then(parseList);
    },

    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/listing/search?' + params)
            .then(function (response) {
                if (options.category && options.category.length > 0) {
                    OzpAnalytics.trackCategorization('Categorization', options.category, response.total);
                }
                else {
                    OzpAnalytics.trackSiteSearch('Application Search', options.queryString, response.total);
                }
                return response;
            })
            .then(parseList);
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

    getChangeLogs: function (id){
        return $.getJSON(API_URL + '/api/listing/' + id + '/activity')
            .then((response) => new PaginatedResponse(response).getItemAsList());
    },

    getItemComments: function (id) {
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

        return $.getJSON(API_URL + '/api/profile/' + id + '/listing')
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
    }
};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
