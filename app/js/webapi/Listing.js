'use strict';

var $ = require('jquery');
var prop = require('../utils/prop');

function Listing (json) {
    var keys = [
        'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts', 'totalComments',
        'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4',
        'totalRate5','totalVotes', 'state', 'tags', 'type','uuid',
        'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
        'launchUrl', 'company', 'whatIsNew', 'owners', 'agency',
        'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls'
    ];

    json.intents = json.intents || [];
    json.screenshots = json.screenshots || json.screenShots;

    keys.forEach(function (key) {
        this[key] = prop(json[key]);
    }.bind(this));

    return this;
}

var ListingApi = {

    getFeatured: function () {
        return $.getJSON(API_URL + '/api/search?isFeatured=true&sort=avgRate&order=desc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getNewArrivals: function () {
        return $.getJSON(API_URL + '/api/search?sort=approvedDate&order=desc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getMostPopular: function () {
        return $.getJSON(API_URL + '/api/search?sort=avgRate&order=asc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/search?' + params).pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
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

    getChangeLogs: function (id){
        return $.getJSON(API_URL + '/api/listing/' + id + '/activity').pipe(function (response) {
            return response.data;
        });
    },

    getOwnedListings: function (profile) {
        var id = profile ? profile.id : 'self';

        return $.getJSON(API_URL + '/api/profile/' + id + '/listing').pipe(function(response) {
            return ([].concat(response._embedded.item)).map(function(json) {
                return new Listing(json);
            });
        });
    }
};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
