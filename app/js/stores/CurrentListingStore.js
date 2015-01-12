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

//list of property names that can be passed into onUpdateListing which are images
//and which must therefore be treated specially.  The 'value' for these properties
//must be either a Blob, or if Blobs are not supported, an HTMLInputElement
var imagePropertyPaths = [
    'smallIcon',
    'largeIcon',
    'bannerIcon',
    'featuredBannerIcon',
    'smallImage',
    'largeImage'
];

//maps stating which url properties go with which
//icon properties
var listingIconPropertyUrlMap = {
    smallIcon: 'imageSmallUrl',
    largeIcon: 'imageMediumUrl',
    bannerIcon: 'imageLargeUrl',
    featuredBannerIcon: 'imageXlargeUrl'
};
var screenshotPropertyUrlMap = {
    smallImage: 'smallImageUrl',
    largeImage: 'largeImageUrl'
};
var imagePropertyUrlMap =
    Object.assign({}, listingIconPropertyUrlMap, screenshotPropertyUrlMap);

/**
 * Check to see if url is an object url and if so revoke it
 */
function revokeObjectURL(url) {
    if (url && window.URL && new URL(url).protocol === 'blob:') {
        URL.revokeObjectURL(url);
    }
}

function updateImageUri(obj, path, imageUri) {
    var prop = path[0];

    if (path.length === 1) {
        var urlProp = imagePropertyUrlMap[prop],
            oldUri = obj[urlProp];

        //if the existing URL is already a temp object URL, revoke it
        revokeObjectURL(oldUri);
        obj[urlProp] = imageUri;
    } else {
        updateImageUri(obj[prop], path.slice(1), imageUri);
    }
}

function updateValue(obj, path, value) {
    if (path.length === 1) {
        obj[path[0]] = value;
    } else {
        updateValue(obj[path[0]], path.slice(1), value);
    }
}

/**
 * saves all of the images in the _listing object and updates the corresponding ids
 * in the _listing object.  Returns a promise that resolves when everything is complete
 */
function saveImages() {

    var optionalPromise = image => image ? ImageApi.save(image) : null,

        {smallIcon, largeIcon, bannerIcon, featuredBannerIcon, screenshots} = _listing,
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
            ...screenshotResponseFlatList) {

            //screenshot responses grouped into twos
        var screenshotResponsePairs =
                _.values(_.groupBy(screenshotResponseFlatList, (x, i) => Math.floor(i/2))),

            //screenshot responses as a list of objects
            screenshotResponses = screenshotResponsePairs.map(function(tuple) {
                    return { smallImageResponse: tuple[0], largeImageResponse: tuple[1] };
                });

        if (smallIconResponse) {
            _listing.smallIconId = smallIconResponse.id;
            _listing[listingIconPropertyUrlMap.smallIcon] = smallIconResponse._links.self.href;
        }
        if (largeIconResponse) {
            _listing.largeIconId = largeIconResponse.id;
            _listing[listingIconPropertyUrlMap.largeIcon] = largeIconResponse._links.self.href;
        }
        if (bannerIconResponse) {
            _listing.bannerIconId = bannerIconResponse.id;
            _listing[listingIconPropertyUrlMap.bannerIcon] =
                bannerIconResponse._links.self.href;
        }
        if (featuredBannerIconResponse) {
            _listing.featuredBannerIconId = featuredBannerIconResponse.id;
            _listing[listingIconPropertyUrlMap.featuredBannerIcon] =
                featuredBannerIconResponse._links.self.href;
        }

        _listing.screenshots =
            _.zip(_listing.screenshots, screenshotResponses).map(function(screenshot) {
                var existing = screenshot[0],
                    responses = screenshot[1],
                    smallResp = responses ? responses.smallImageResponse : null,
                    largeResp = responses ? responses.largeImageResponse : null,
                    newScreenshot = Object.assign({}, existing);

                if (smallResp) {
                    newScreenshot.smallImageId = smallResp.id;
                    newScreenshot[screenshotPropertyUrlMap.smallImage] =
                        smallResp._links.self.href;
                }

                if (largeResp) {
                    newScreenshot.largeImageId = largeResp.id;
                    newScreenshot[screenshotPropertyUrlMap.largeImage] =
                        largeResp._links.self.href;
                }

                return newScreenshot;
            });
    });
}

function getSystem () {
    return SystemStore.getSystem();
}

/**
 * Clean up any generated object URLs that have been added to the listing.  Note that this
 * doesn't actually remove the URLs, just makes them invalid and allows the browser to clean
 * up the associated memory
 */
function revokeAllObjectURLs() {
    if (_listing) {
        var listingProps = Object.keys(listingIconPropertyUrlMap)
                .map(k => listingIconPropertyUrlMap[k]),
            screenshotProps = Object.keys(screenshotPropertyUrlMap)
                .map(k => screenshotPropertyUrlMap[k]);

        listingProps.forEach(p => revokeObjectURL(_listing[p]));
        _listing.screenshots.forEach(s => screenshotProps.forEach(p => revokeObjectURL(s[p])));
    }
}

var CurrentListingStore = createStore({
    listenables: actions,

    refreshListing: function (listing) {
        revokeAllObjectURLs();

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

        updateValue(_listing, propertyPath, value);

        if (imagePropertyPaths.indexOf(_.last(propertyPath)) !== -1){
            this.updateImage(propertyPath, value);
        }

        var validation = this.doValidation();
        this.trigger({
            listing: _listing,
            hasChanges: true,
            errors: validation.errors,
            warnings: validation.warnings
        });
    },

    updateImage: function(propertyPath, value) {
        //on modern browsers, create a URL to reference the local image data. On old browsers
        //this will be skipped and uri will be undefined
        var uri = window.URL && window.Blob && value instanceof Blob ?
            URL.createObjectURL(value) : undefined;

        updateImageUri(_listing, propertyPath, uri);
    },

    onSystemUpdated: function () {
        this.trigger(this.resolveMessages());
    },

    onSubmit: function () {
        var me = this,
            oldStatus = _listing.approvalStatus;

        _listing.approvalStatus = 'PENDING';
        _submitting = true;

        saveImages().then(function() {
            var validation = me.doValidation();

            if(!validation.isValid) {
                _listing.approvalStatus = oldStatus;
                me.trigger(validation);
            } else {
                me._save();
            }
        });
    },

    onSave: function () {
        var me = this;

        _submitting = false;

        saveImages().then(function() {
            var validation = me.doValidation();

            if(!validation.isValid) {
                me.trigger(validation);
            } else {
                me._save();
            }
        });
    },

    /**
     * Save the listing.  Cleans up the _listing data to create the proper json to save
     */
    _save: function() {
        var screenshots = _listing.screenshots.map(
                s => _.omit(s, 'smallImage', 'largeImage', 'smallImageUrl', 'largeImageUrl')
            ),
            strippedListing = _.omit(_listing,
                'imageSmallUrl', 'imageMediumUrl', 'imageLargeUrl', 'imageXlargeUrl',
                'smallIcon', 'largeIcon', 'bannerIcon', 'featuredBannerIcon', 'screenshots'),
            listing = Object.assign(strippedListing, {screenshots: screenshots});


        save(listing);
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
