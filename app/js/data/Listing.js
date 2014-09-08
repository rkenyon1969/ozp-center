'use strict';

var prop = require('../utils/prop');

function Listing (json) {
    var keys = [
        'id', 'title', 'description', 'screenshots', 'techPocs', 'totalComments',
        'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4',
        'totalRate5','totalVotes', 'state', 'tags', 'types','uuid',
        'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl',
        'launchUrl', 'company', 'whatsNew', 'owners', 'organization',
        'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls'
    ];

    keys.forEach(function (key) {
        this[key] = prop(json[key]);
    }.bind(this));

    return this;
}

var ListingApi = {

    getFeatured: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/search?isFeatured=true&sort=avgRate&order=desc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getNewArrivals: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/search?sort=approvedDate&order=desc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getMostPopular: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/search?sort=avgRate&order=asc&max=24').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON('http://localhost:8080/marketplace/api/search?' + params).pipe(function (response) {
            var listings = [];

            response.data.forEach(function (json) {
                var listing = new Listing(json);
                if (listing.title().toLowerCase().indexOf(options.query.toLowerCase()) > -1) {
                    listings.push(listing);
                }
            });

            return listings;
        });
    },

    save: function (data) {
        var url = 'http://localhost:8080/marketplace/api/serviceItem';
        url = data.id ? url + '/' + data.id : url;

        return $.ajax({
            type: 'POST',
            async: false,
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        });
    }

};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;
