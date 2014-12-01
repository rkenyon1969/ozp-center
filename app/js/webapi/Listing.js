'use strict';

var $ = require('jquery');
var _ = require('../utils/_');
var OzpAnalytics = require('../analytics/ozp-analytics');

var keys = [
    'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts', 'totalComments',
    'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4', 'height', 'width',
    'totalRate5','totalVotes', 'state', 'tags', 'type','uuid', 'requirements', 'singleton',
    'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'launchUrl', 'company', 'whatIsNew', 'owners', 'agency', 'currentRejection', 'isEnabled',
    'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls', 'approvalStatus',
    'isFeatured'
];

function Listing (json) {
    json = json || {};

    keys.forEach(key => {
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

var ListingApi = {

    getFeatured: function () {
        return $.getJSON(API_URL + '/api/listing/search?isFeatured=true&sort=avgRate&order=DESC&max=24').pipe(function (response) {
            return ((response._embedded && [].concat(response._embedded.item)) || []).map(function (json) {
                return new Listing(json);
            });
        });
    },

    getNewArrivals: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=approvedDate&order=DESC&max=24').pipe(function (response) {
            return ((response._embedded && [].concat(response._embedded.item)) || []).map(function (json) {
                return new Listing(json);
            });
        });
    },

    getMostPopular: function () {
        return $.getJSON(API_URL + '/api/listing/search?sort=avgRate&order=ASC&max=24').pipe(function (response) {
            return ((response._embedded && [].concat(response._embedded.item)) || []).map(function (json) {
                return new Listing(json);
            });
        });
    },

    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/listing/search?' + params).pipe(function (response) {
            if (options.category && options.category.length > 0) {
                OzpAnalytics.trackCategorization('Categorization', options.category, response.total);
            }
            else {
                OzpAnalytics.trackSiteSearch('Application Search', options.queryString, response.total);
            }

            return ((response._embedded && [].concat(response._embedded.item)) || []).map(function (json) {
                return new Listing(json);
            });
        });
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
        return $.getJSON(API_URL + '/api/listing/' + id + '/activity').pipe(function (response) {
            return (response._embedded && [].concat(response._embedded.item)) || [];
        });
    },

    getOwnedListings: function (profile) {
        var id = profile ? profile.id : 'self';

        return $.getJSON(API_URL + '/api/profile/' + id + '/listing').pipe(function(response) {
            var embedded = response._embedded,
                items = embedded ? embedded.item : null;

            return (items || []).map(function(json) {
                return new Listing(json);
            });
        });
    },

    rejectListing: function (id, description) {
        return $.ajax({
            type: 'POST',
            url: API_URL + '/api/listing/' + id + '/rejectionListing',
            data: JSON.stringify({description: description}),
            dataType: 'json',
            contentType: 'application/json'
        });
    }
};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
