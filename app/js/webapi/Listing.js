'use strict';

var $ = require('jquery');
var humps = require('humps');
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
    json = humps.camelizeKeys(json);

    FIELDS.forEach((key) => {
        this[key] = json[key];
    });

    this.agencyShort = json.agency.shortName;
    this.bannerIconId = json.bannerIcon.id;
    this.editedDate = json.approvedDate;  // TODO: re-evaluate
    this.featuredBannerIconId = json.largeBannerIcon.id;  // TODO: re-evaluate
    this.height = json.largeBannerIcon.maxHeight;  // TODO: re-evaluate
    this.imageLargeUrl = json.bannerIcon.url;
    this.imageMediumUrl = json.largeIcon.url;
    this.imageSmallUrl = json.smallIcon.url;
    this.imageXlargeUrl = json.largeBannerIcon.url;
    this.largeIconId = json.bannerIcon.id;
    this.releaseDate = json.approvedDate;  // TODO: re-evaluate
    this.smallIconId = json.smallIcon.id;
    this.type = json.appType;
    this.uuid = json.uniqueName;
    this.width = json.largeBannerIcon.maxWidth;  // TODO: re-evaluate


    this.intents = this.intents || [];
    this.screenshots = this.screenshots || [];
    this.categories = this.categories || [];
    this.contacts = this.contacts || [];
    this.docUrls = this.doc_urls || [];
    this.owners = this.owners || [];
    this.tags = this.tags || [];
    this.changeLogs = [];

    return this;
}

function parseList (response) {
    return new PaginatedResponse(response, Listing).getResponse();
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

    newListing: function(listingData) {
        return new Listing(listingData);
    },

    getStorefrontListings: function() {
        return $.getJSON(API_URL + '/api/storefront/')
            .then(resp => ({
                featured: _.map(resp.featured, this.newListing),
                newArrivals: _.map(resp.recent, this.newListing),
                mostPopular: _.map(resp.most_popular, this.newListing)
            }));
    },

    getFeatured: function () {
        return $.getJSON(API_URL + '/api/listings/search?isFeatured=true&sort=avgRate&order=DESC&max=24')
            .then(
                resp => parseList(_.map(resp, this.newListing))
            );
    },

    getNewArrivals: function () {
        return $.getJSON(API_URL + '/api/listings/search?sort=approvedDate&order=DESC&max=24')
            .then(
                resp => parseList(_.map(resp, this.newListing))
            );
    },

    getMostPopular: function () {
        return $.getJSON(API_URL + '/api/listings/search?sort=avgRate&order=DESC&max=36')
            .then(
                resp => parseList(this.newListing(resp))
            );
    },
    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/listings/search?' + params).then(
            (response) => {
                response = _.map(response, this.newListing);
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
        return $.getJSON(API_URL + '/api/listing/' + id + '/').then(
            resp => this.newListing(resp)
        );
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
        var url = API_URL + '/api/self/listing/';

        if (profile) {
            url = url + profile.id + '/';
        }
        return $.getJSON(url).then(
            resp => parseList(_.map(resp, this.newListing))
        );
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
            return new PaginatedResponse(this.newListing(response), Listing);
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
