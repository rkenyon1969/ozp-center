'use strict';

var prop = require('../utils/prop');

function Listing (json) {
    var keys = [
        'title', 'description', 'screenshots', 'techPocs', 'totalComments',
        'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4',
        'totalRate5','totalVotes', 'state', 'tags', 'types','uuid',
        'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl',
        'launchUrl', 'company'
    ];

    keys.forEach(function (key) {
        this[key] = prop(json[key]);
    }.bind(this));

    return this;
}

var ListingApi = {

    getNewArrivals: function () {
        return $.getJSON('./mocks/NewArrivals.json').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    getMostPopular: function () {
        return $.getJSON('./mocks/MostPopular.json').pipe(function (response) {
            return response.data.map(function (json) {
                return new Listing(json);
            });
        });
    },

    search: function (options) {
        return $.getJSON('./mocks/MostPopular.json').pipe(function (response) {
            var listings = [];

            response.data.forEach(function (json) {
                var listing = new Listing(json);
                if (listing.title().toLowerCase().indexOf(options.query.toLowerCase()) > -1) {
                    listings.push(listing);
                }
            });

            return listings;
        });
    }

};

module.exports.Listing = Listing;
module.exports.ListingApi = ListingApi;