'use strict';

var $ = require('jquery');
var humps = require('humps');
var _ = require('../utils/_');
var OzpAnalytics = require('../analytics/ozp-analytics');
var PaginatedResponse = require ('./responses/PaginatedResponse');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var FIELDS = [
    'approvedDate', 'id', 'title', 'description', 'descriptionShort', 'screenshots', 'contacts',
    'totalComments', 'avgRate', 'totalRate1', 'totalRate2', 'totalRate3','totalRate4', 'height',
    'width', 'totalRate5','totalVotes', 'state', 'tags', 'type','uuid', 'requirements', 'singleton',
    'versionName', 'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'launchUrl', 'company', 'whatIsNew', 'owners', 'agency', 'agencyShort', 'rejection',
    'isEnabled', 'categories', 'releaseDate', 'editedDate', 'intents', 'docUrls', 'approvalStatus',
    'isFeatured', 'smallIconId', 'largeIconId', 'bannerIconId', 'featuredBannerIconId',
    'currentRejection', 'isPrivate', 'securityMarking', 'smallIconMarking',
    'largeIconMarking', 'bannerIconMarking', 'featuredBannerIconMarking'
];

// These don't have the icons, access_control
var SAVE_FORMAT_FIELDS = [
    'agency', 'approval_status', 'approved_date', 'avg_rate', 'categories', 'contacts',
    'description', 'description_short', 'doc_urls', 'id', 'intents', 'is_enabled', 'is_featured',
    'is_private', 'last_activity', 'launch_url', 'listing_type', 'owners', 'required_listings',
    'requirements', 'screenshots', 'singleton', 'tags', 'title', 'total_comments', 'total_rate1',
    'total_rate2', 'total_rate3', 'total_rate4', 'total_rate5', 'total_votes', 'unique_name',
    'version_name', 'what_is_new', 'small_icon', 'large_icon', 'banner_icon', 'large_banner_icon',
    'security_marking'
];

function Listing (json) {

    if (!(this instanceof Listing)) {
        throw new Error("This object must be created with new");
    }

    json = json || {};
    json = humps.camelizeKeys(json);

    FIELDS.forEach((key) => {
        this[key] = json[key];
    });

    function viewingExistingListing(json) {
        // This data comes from the API/listing endpoint
        return ('listingType' in json);
    }

    function creatingFreshListing(json) {
        // Fresh create/edit pages are prepopulated with owner info
        return ('owners' in json) && !('listingType' in json) && !('type' in json);
    }

    if (viewingExistingListing(json)) {
        // console.log('viewing existing listing (data comes from API) ');
        this.type = json.listingType ? json.listingType.title : "";
        this.categories = _.map(json.categories, 'title') || [];
        this.tags = _.map(json.tags, 'name') || [];
        this.agency = json.agency ? json.agency.title : "";
        this.agencyShort = json.agency ? json.agency.shortName : "";
        this.owners = _.map(json.owners, function (o) {
            return {displayName: o.displayName,
                    id: o.id,
                    username: o.user.username};
        });
        this.intents = _.map(this.intents, x => x.action);
        _.map(this.contacts, x => x.type = x.contactType.name);

        this.smallIconId = json.smallIcon ? json.smallIcon.id : "";
        this.imageSmallUrl = json.smallIcon ? json.smallIcon.url : "";
        this.smallIconMarking = json.smallIcon ? json.smallIcon.securityMarking : "";

        this.largeIconId = json.largeIcon ? json.largeIcon.id : "";
        this.imageMediumUrl = json.largeIcon ? json.largeIcon.url : "";
        this.largeIconMarking = json.largeIcon ? json.largeIcon.securityMarking : "";

        this.bannerIconId = json.bannerIcon ? json.bannerIcon.id : "";
        this.imageLargeUrl = json.bannerIcon ? json.bannerIcon.url : "";
        this.bannerIconMarking = json.bannerIcon ? json.bannerIcon.securityMarking : "";

        this.featuredBannerIconId = json.largeBannerIcon ? json.largeBannerIcon.id :  "";
        this.imageXlargeUrl = json.largeBannerIcon ? json.largeBannerIcon.url : "";
        this.featuredBannerIconMarking = json.largeBannerIcon ? json.largeBannerIcon.securityMarking :  "";

        _.map(this.screenshots, x => {
            x.smallImageId = x.smallImage.id;
            x.smallImageUrl = x.smallImage.url;
            x.largeImageId = x.largeImage.id;
            x.largeImageUrl = x.largeImage.url;
            delete x.smallImage;
            delete x.largeImage;
        });

        this.uuid = json.uniqueName;

    } else if (creatingFreshListing(json)) {
        // console.log('creating fresh listing (in create/edit page)' );
        this.owners = _.map(json.owners, function (o) {
            return {displayName: o.displayName,
                    id: o.id,
                    username: o.username};
        });
        this.categories = json.categories || [];
        this.tags = json.tags || [];
        this.agency = json.agency || "";
        this.agencyShort = json.agencyShort || "";
        this.intents = json.intents || [];
        this.contacts = this.contacts || [];

    } else {
        // console.log('editing listing (data comes from create/edit page)');
        this.title = json.title || "";
        this.type = json.type || "";
        this.owners = json.owners || [];
        this.categories = json.categories || [];
        this.tags = json.tags || [];
        this.agency = json.agency || "";
        this.agencyShort = json.agencyShort || "";
        this.intents = json.intents || [];
        this.contacts = this.contacts || [];
    }

    this.screenshots = this.screenshots || [];
    this.docUrls = this.docUrls || [];
    this.changeLogs = [];

    // console.log('object Listing', this);

    return this;
}

Listing.prototype.addAccessControl = function(ob){
    ob.access_control = {
        "title": "UNCLASSIFIED"
    };
};

Listing.prototype.saveFormat = function() {

    var saveFormat = humps.decamelizeKeys(this);

    // Improperly decamelized
    saveFormat.total_rate1 = saveFormat.total_rate_1;
    saveFormat.total_rate2 = saveFormat.total_rate_2;
    saveFormat.total_rate3 = saveFormat.total_rate_3;
    saveFormat.total_rate4 = saveFormat.total_rate_4;
    saveFormat.total_rate5 = saveFormat.total_rate_5;

    // Differing structure between API and Center
    saveFormat.approved_date = saveFormat.release_date;
    saveFormat.listing_type = {};
    saveFormat.listing_type.title = saveFormat.type;
    saveFormat.categories = _.map(saveFormat.categories, x => { return {"title": x}; });
    saveFormat.tags = _.map(saveFormat.tags, x => { return {"name": x}; });
    saveFormat.unique_name = saveFormat.uuid;

    saveFormat.owners = _.map(saveFormat.owners, function (o) {
        return {display_name: o.display_name,
                id: o.id,
                user: {username: o.username}};
    });

    if (saveFormat.agency !== "") {
        var agencyTitle = saveFormat.agency;
        saveFormat.agency = {};
        saveFormat.agency.short_name = saveFormat.agency_short;
        saveFormat.agency.title = agencyTitle;
    } else {
        saveFormat.agency = {};
    }

    saveFormat.intents = _.map(saveFormat.intents, x => { return {"action": x}; });

    _.map(saveFormat.contacts, x => {
        x.contact_type = {"name": x.type};
        delete x.type;
    });


    if (saveFormat.image_small_url) {
        saveFormat.small_icon = {};
        saveFormat.small_icon.url = saveFormat.image_small_url;
        saveFormat.small_icon.id = saveFormat.small_icon_id;
        saveFormat.small_icon.security_marking = saveFormat.small_icon_marking;
    }

    if (saveFormat.image_medium_url) {
        saveFormat.large_icon = {};
        saveFormat.large_icon.url = saveFormat.image_medium_url;
        saveFormat.large_icon.id = saveFormat.large_icon_id;
        this.addAccessControl(saveFormat.large_icon);
    }

    if (saveFormat.image_large_url) {
        saveFormat.banner_icon = {};
        saveFormat.banner_icon.url = saveFormat.image_large_url;
        saveFormat.banner_icon.id = saveFormat.banner_icon_id;
        this.addAccessControl(saveFormat.banner_icon);
    }

    if (saveFormat.image_xlarge_url) {
        saveFormat.large_banner_icon = {};
        saveFormat.large_banner_icon.url = saveFormat.image_xlarge_url;
        saveFormat.large_banner_icon.id = saveFormat.featured_banner_icon_id;
        this.addAccessControl(saveFormat.large_banner_icon);
    }

    _.map(saveFormat.screenshots, x => {
        if (x.small_image_url) {
            x.small_image = {};
            x.small_image.id = x.small_image_id;
            x.small_image.url = x.small_image_url;
            this.addAccessControl(x.small_image);
            delete x.small_image_id;
            delete x.small_image_url;
        }

        if (x.large_image_url) {
            x.large_image = {};
            x.large_image.id = x.large_image_id;
            x.large_image.url = x.large_image_url;
            this.addAccessControl(x.large_image);
            delete x.large_image_id;
            delete x.large_image_url;
        }
    });

    // New data (to Center) - TODO: Have Center add it for real
    saveFormat.last_activity = { action: 'APPROVED' };
    saveFormat.required_listings = null;

    // Clean up lingering Center-only keys (and impromperly decamelized keys)
    var lingering = _.difference(_.keys(saveFormat), SAVE_FORMAT_FIELDS);
    lingering.map(key => delete saveFormat[key]);

    this.addAccessControl(saveFormat);

    return saveFormat;
};

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
        return $.getJSON(API_URL + '/api/storefront/').then(
            resp => ({
                featured: _.map(resp.featured, this.newListing),
                newArrivals: _.map(resp.recent, this.newListing),
                mostPopular: _.map(resp.most_popular, this.newListing)
            }));
    },

    search: function (options) {
        var params = $.param(options, true);
        return $.getJSON(API_URL + '/api/listings/search?' + params).then(
            (response) => {
                if (options.categories && options.categories.length > 0) {
                    for(var index = 0; index < options.categories.length; index++) {
                        OzpAnalytics.trackCategorization('Categorization', options.categories[index], response.count);
                    }
                }

                delaySearch(function(){
                    if (options.queryString) {
                        var queryStringNoStar = options.queryString.replace(/[*]$/,"");
                        if ((options.type && options.type.length > 0) ||
                            (options.categories && options.categories.length > 0) ||
                            (options.agency && options.agency.length > 0)) {
                            queryStringNoStar = queryStringNoStar + ' (+)';
                        }
                        OzpAnalytics.trackSiteSearch('Application Search', queryStringNoStar, response.count);
                    }
                }, 800);

                response.results = _.map(response.results, this.newListing);
                return response;

            })
            .then(parseListToPaginatedResponse);
    },

    getById: function (id) {
        return $.getJSON(API_URL + '/api/listing/' + id + '/').then(
            (resp) => this.newListing(resp));
    },

    save: function (data) {
        var listing = new Listing(data);
        data = listing.saveFormat();

        var method = data.id ? 'PUT' : 'POST';
        var url = API_URL + '/api/listing/';
        url = data.id ? url + data.id + '/' : url;

        return $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        }).then(
            (response) => this.newListing(response)
        );
    },

    del: function (id) {
        return $.ajax({
            type: 'DELETE',
            url: API_URL + '/api/listing/' + encodeURIComponent(id) + '/'
        });
    },

    getChangeLogs: function (id) {
        return $.getJSON(API_URL + '/api/listing/' + id + '/activity/').then(
            // TODO: consider paging
            (response) => new humps.camelizeKeys(response));
    },

    fetchReviews: function (id) {
        // TODO: consider paging
        return $.getJSON(API_URL + '/api/listing/' + id + '/review/').then(
            (response) => new humps.camelizeKeys(response));
    },

    saveReview: function (listingId, review) {
        var url = `${API_URL}/api/listing/${listingId}/review/`,
            method = 'POST';
        if (review.id) {
            method = 'PUT';
            url += `${review.id}/`;
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
            url: `${API_URL}/api/listing/${listingId}/review/${reviewId}/`,
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
            (resp) => parseList(_.map(resp, this.newListing)));
    },

    rejectListing: function (id, description) {
        return $.ajax({
            type: 'POST',
            url: API_URL + '/api/listing/' + id + '/rejection/',
            data: JSON.stringify({description: description}),
            dataType: 'json',
            contentType: 'application/json'
        });
    },

    getAllListings: function (url, options) {
        if (!_.isString(url)) {
            url = API_URL + '/api/listing?' + $.param(options);
        }

        return $.getJSON(url).then(
            (response) => {
                response.results = _.map(response.results, this.newListing);
                return new PaginatedResponse(response, Listing);
            });
    },

    getCounts: function () {
        var url = API_URL + '/api/metadata';
        return $.getJSON(url).then((response) => {
            var counts = _.reduce(response.agencies,
                                  (result, o) => {
                                      result[o.id] = o.listing_count;
                                      return result;
                                  }, {});
            return counts;
        });
    },

    getAllChangeLogs: function (profile, url, options) {
        if(!_.isString(url)) {
            if (profile.isAdmin() || profile.highestRole === 'ORG_STEWARD' ){
                url = API_URL + '/api/listings/activity?' + $.param(options);
            } else {
                url = API_URL + '/api/self/profile/' + profile.id + '/listing/activity?' + $.param(options);
            }
        }
        return $.getJSON(url).then(
            (response) => new PaginatedResponse(humps.camelizeKeys(response)));
    }
};

module.exports = {
    Listing: Listing,
    ListingApi: ListingApi,
    FIELDS: FIELDS,
    SAVE_FORMAT_FIELDS: SAVE_FORMAT_FIELDS
};
