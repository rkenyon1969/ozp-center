'use strict';

var $ = require('jquery');
var prop = require('../utils/prop');
var _cloneDeep = require('lodash/objects/cloneDeep');

var keys = [
    'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts', 'totalComments',
    'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4',
    'totalRate5','totalVotes', 'state', 'tags', 'type','uuid', 'requirements',
    'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'launchUrl', 'company', 'whatIsNew', 'owners', 'agency', 'currentRejection',
    'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls', 'approvalStatus'
];

function Listing (json) {
    json = json || {};
    json.intents = json.intents || [];
    json.screenshots = json.screenshots || [];
    json.categories = json.categories || [];
    json.contacts = json.contacts || [];
    json.docUrls = json.docUrls || [];
    json.owners = json.owners || [];
    json.tags = json.tags || [];

    keys.forEach(function (key) {
        this[key] = prop(json[key]);
    }.bind(this));

    return this;
}

Listing.prototype.toObject = function () {
    return JSON.parse(JSON.stringify(this));
};

Listing.prototype.clone = function () {
    var obj = _cloneDeep(this.toObject());
    return new Listing(obj);
};

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
            return response.data;
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
    }
};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
