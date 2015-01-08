'use strict';

var $ = require('jquery');
var _ = require('../utils/_');

var { createStore } = require('reflux');
var GlobalListingStore = require('./GlobalListingStore');
var SystemStore = require('./SystemStore');
var ProfileStore = require('./ProfileStore');
var actions = require('../actions/CreateEditActions');
var { save } = require('../actions/ListingActions');
var { validateDraft, validateFull } = require('../components/createEdit/validation/listing');
var { listingMessages } = require('../constants/messages');
var { Listing } = require('../webapi/Listing');
var { approvalStatus } = require('../constants');
var { cloneDeep, assign } = require('../utils/_');
var { ListingApi } = require('../webapi/Listing');
var { ImageApi } = require('../webapi/Image');

actions.systemUpdated = SystemStore;
actions.cacheUpdated = GlobalListingStore;

var _listing = null;
var _submitting = false;

//Each item in this object should be either a Blob/File, or if those are not supported, a
//file input element
var listingRawImages = {
    smallIcon: null,
    largeIcon: null,
    bannerIcon: null,
    featuredBannerIcon: null,
    screenshots: []
};

//list of property names that can be passed into onUpdateListing which are images
//and which must therefore be treated specially
var imagePropertyPaths = [
    ['smallIcon'],
    ['largeIcon'],
    ['bannerIcon'],
    ['featuredBannerIcon'],
    ['screenshots', 'smallImage'],
    ['screenshots', 'largeImage'],
];

function updateValue(obj, path, value) {
    if (path.length === 1) {
        obj[path[0]] = value;
    } else {
        updateValue(obj[path[0]], path.slice(1), value);
    }
}

/**
 * saves all of the images in the listingRawImages object and updates the corresponding ids
 * in the _listing object.  Returns a promise that resolves when everything is complete
 */
function saveImages() {

    var optionalPromise = image => image ? ImageApi.save(image) : null,

        {smallIcon, largeIcon, bannerIcon, featuredBannerIcon, screenshots} = listingRawImages,
        smallIconPromise = optionalPromise(smallIcon),
        largeIconPromise = optionalPromise(largeIcon),
        bannerIconPromise = optionalPromise(bannerIcon),
        featuredBannerIconPromise = optionalPromise(featuredBannerIcon),
        screenshotPromises = _.flatten(screenshots.map(
            s => [optionalPromise(s.smallImage), optionalPromise(s.largeImage)]
        )),
        promises =
            [smallIconPromise, largeIconPromise, bannerIconPromise, featuredBannerIconPromise]
                .concat(screenshotPromises);

    //TODO when we get a less buggy ES6 parser we can use the spread operator to make the
    //invocation of `when` cleaner
    return $.when.apply($, promises).then(function(
            smallIconResponse,
            largeIconResponse,
            bannerIconResponse,
            featuredBannerIconResponse,
            ...screeshotResponseFlatList) {

            //screenshot responses grouped into twos
        var screenshotResponsePairs =
                _.values(_.groupBy(screeshotResponseFlatList, (x, i) => Math.floor(i/2))),

            //screenshot responses as a list of objects
            screenshotResponses = screenshotResponsePairs.map(function(acc, tuple) {
                    return { smallImageResponse: tuple[0], largeImageResponse: tuple[1] };
                });

        _listing.smallIconId = smallIconResponse ? smallIconResponse.id : null;
        _listing.largeIconId = largeIconResponse ? largeIconResponse.id : null;
        _listing.bannerIconId = bannerIconResponse ? bannerIconResponse.id : null;
        _listing.featuredBannerIconId =
            featuredBannerIconResponse ? featuredBannerIconResponse.id : null;

        _listing.screenshots = screenshotResponses.map(function(responseObj) {
            return {
                smallImageId: responseObj.smallImageresponse.id,
                largeImageId: responseObj.largeImageresponse.id
            };
        });
    });
}

function getSystem () {
    return SystemStore.getSystem();
}

var CurrentListingStore = createStore({
    listenables: actions,

    refreshListing: function (listing) {
        _listing = listing;
        _submitting = false;
        var validation = this.doValidation();
        this.trigger({
            listing: _listing,
            isValid: true,
            hasChanges: false,
            errors: validation.errors,
            warnings: validation.warnings
        });
    },

    onListingCreated: function (listing) {
        this.refreshListing(cloneDeep(listing));
    },

    onCacheUpdated: function () {
        if (_listing && _listing.id) {
            var listing = GlobalListingStore.getById(_listing.id);
            if (listing) {
                this.refreshListing(cloneDeep(listing));
            }
        }
    },

    onUpdateListing: function (propertyPath, value) {
        if (propertyPath.length < 1 || !Array.isArray(propertyPath)) {
            throw 'propertyPath needs to be an array with non zero length';
        }

        //if property path matches one of the imagePropertyPaths element-for-element
        var isImage = !!_.find(imagePropertyPaths,
            p => _.every(_.zip(p, propertyPath), (tuple) => tuple[0] === tuple[1])
        );

        if (isImage){
            this.updateImage(propertyPath, value);
        }
        else {
            updateValue(_listing, propertyPath, value);

            var validation = this.doValidation();
            this.trigger({
                listing: _listing,
                hasChanges: true,
                errors: validation.errors,
                warnings: validation.warnings
            });
        }
    },

    updateImage: function(propertyPath, value) {
        var validation;

        updateValue(listingRawImages, propertyPath, value);

        validation = this.doValidation();
        this.trigger({
            listing: _listing,
            hasChanges: true,
            errors: validation.errors,
            warnings: validation.warnings
        });
    },

    onSystemUpdated: function (data) {
        this.trigger(this.resolveMessages());
    },

    onSubmit: function () {
        var oldStatus = _listing.approvalStatus;
        _listing.approvalStatus = 'PENDING';
        _submitting = true;
        var validation = this.doValidation();

        saveImages();

        if(!validation.isValid) {
            _listing.approvalStatus = oldStatus;
            this.trigger(validation);
        } else {
            save(_listing);
        }
    },

    onSave: function () {
        var me = this;

        _submitting = false;

        saveImages().then(function() {
            var validation = me.doValidation();

            if(!validation.isValid) {
                me.trigger(validation);
            } else {
                save(_listing);
            }
        });
    },

    doValidation: function () {
        var status = approvalStatus[_listing.approvalStatus];
        var isDraft = !status || status === approvalStatus.IN_PROGRESS;
        return isDraft && !_submitting ? this.getDraftValidation() : this.getFullValidation();
    },

    getDraftValidation: function () {
        var { errors, isValid } = validateDraft(_listing, getSystem());
        return {
            isValid: isValid,
            errors: errors,
            warnings: validateFull(_listing, getSystem()).errors
        };
    },

    getFullValidation: function () {
        var { errors, isValid } = validateFull(_listing, getSystem());
        return {
            errors: errors,
            isValid: isValid,
            warnings: {}
        };
    },

    resolveMessages: function () {
        var messages = listingMessages;
        var requiredContactTypes = getSystem().contactTypes.filter(t => t.required).map(t => t.title);

        if (requiredContactTypes.length > 0) {
            messages['help.contacts'] = 'At least one contact of each of the ' +
                'following types must be provided: ' + requiredContactTypes.join(', ') + '.';
        }

        return { messages: messages };
    },

    getDefaultData: function () {
        return assign({}, this.resolveMessages(), { listing: _listing });
    },

    currentUserCanEdit: function () {
        return ProfileStore.currentUserCanEdit(_listing);
    },

    getChangeLogs: function (){
        return GlobalListingStore.getChangeLogsForListing(_listing.id);
    },

    loadListing: function (id) {
        var deferred = $.Deferred(),
            promise = deferred.promise();

        if (id) {
            var listing = GlobalListingStore.getCache()[id];
            if (listing) {
                this.refreshListing(cloneDeep(listing));
                deferred.resolve(_listing);
            } else {
                ListingApi.getById(id).then(l => {
                    this.refreshListing(new Listing(l));
                    deferred.resolve(_listing);
                });
            }
        } else {
            this.refreshListing(new Listing({ owners: [ProfileStore.getCurrentUser()] }));
            deferred.resolve(_listing);
        }

        return promise;
    }
});

module.exports = CurrentListingStore;
