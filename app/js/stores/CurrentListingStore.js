'use strict';

var $ = require('jquery');
var _ = require('../utils/_');
var humps = require('humps');

var { createStore } = require('reflux');
var GlobalListingStore = require('./GlobalListingStore');
var SystemStore = require('./SystemStore');
var SelfStore = require('ozp-react-commons/stores/SelfStore');
var CreateEditActions = require('../actions/CreateEditActions');
var ListingActions = require('../actions/ListingActions');
var { validateDraft, validateFull } = require('../components/createEdit/validation/listing');
var { listingMessages } = require('ozp-react-commons/constants/messages');
var { Listing } = require('../webapi/Listing');
var { approvalStatus } = require('ozp-react-commons/constants');
var { cloneDeep, assign } = require('../utils/_');
var { ListingApi } = require('../webapi/Listing');
var { ImageApi } = require('../webapi/Image');
var { API_URL } = require('ozp-react-commons/OzoneConfig');
var { toTitleCase } = require('../utils/string.js');

var _listing = null;
var _submitting = false;

var imageErrors = {screenshots: []};

require('sweetalert');

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
    if (url && window.URL) {
        //if (new URL(url).protocol === 'blob:') { //IE doesn't support the protocol property
        if (url.indexOf('blob:') === 0) {
            URL.revokeObjectURL(url);
        }
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

        //unset the server-assigned id
        obj[prop + 'Id'] = null;
    } else {
        updateImageUri(obj[prop], path.slice(1), imageUri);
    }
}

function updateValue(obj, path, value) {

    if (path.length === 1) {
        obj[path[0]] = value;
    } else {
        var nextLevel = obj[path[0]];
        if (nextLevel === undefined) {
            obj[path[0]] = nextLevel = {};
        }

        updateValue(nextLevel, path.slice(1), value);
    }
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
    listenables: [
        Object.assign({}, CreateEditActions, {
            systemUpdated: SystemStore,
            cacheUpdated: GlobalListingStore
        }),
        { profileUpdate: SelfStore }
    ],

    currentUser: null,

    refreshListing: function (listing) {
        revokeAllObjectURLs();

        _listing = listing;
        _submitting = false;
        var validation = this.doValidation();
        this.trigger({
            listing: _listing,
            isValid: true,
            hasChanges: false,
            saveStatus: null,
            errors: validation.errors,
            warnings: validation.warnings,
            imageErrors: imageErrors
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

    onProfileUpdate: function(profileData) {
        this.currentUser = profileData.currentUser;
    },

    onUpdateListing: function (propertyPath, value) {
        if (propertyPath.length < 1 || !Array.isArray(propertyPath)) {
            throw 'propertyPath needs to be an array with non zero length';
        }

        _listing = cloneDeep(_listing);

        updateValue(_listing, propertyPath, value);

        if (imagePropertyPaths.indexOf(_.last(propertyPath)) !== -1){
            this.updateImage(propertyPath, value);
        }

        var validation = this.doValidation();
        this.trigger({
            listing: _listing,
            hasChanges: true,
            errors: validation.errors,
            warnings: validation.warnings,
            imageErrors: imageErrors
        });
    },

    updateImage: function(propertyPath, value) {
        //on modern browsers, create a URL to reference the local image data. On old browsers
        //this will be skipped and uri will be undefined
        var uri = window.URL && window.Blob && value instanceof Blob ?
            URL.createObjectURL(value) : undefined;

        updateImageUri(_listing, propertyPath, uri);
        updateValue(imageErrors, propertyPath, null);
    },

    onSystemUpdated: function () {
        this.trigger(this.resolveMessages());
    },

    onSubmit: function () {
        var oldStatus = _listing.approvalStatus;

        _listing.approvalStatus = 'PENDING';
        _submitting = true;

        this._save({approvalStatus: oldStatus});
    },

    onSave: function () {
        _submitting = false;
        this._save();
    },

    onDiscard: function () {
        _listing = null;
    },

    /**
     * Save the listing.
     * @param oldListingData The data to set back on _listing if there is a validation
     * failure
     */
    _save: function(oldListingData) {
        var me = this;

        this.trigger({saveStatus: 'images'});

        this.saveImages().then(function() {
            me.trigger({saveStatus: 'listing'});
            var validation = me.doValidation();

            if(!validation.isValid) {
                Object.assign(_listing, oldListingData);
                me.trigger(Object.assign({saveStatus: null}, validation));
            } else {
                ListingActions.save(_listing);
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
        var requiredContactTypes = getSystem().contactTypes.filter(t => t.required).map(t => t.name);

        if (requiredContactTypes.length > 0) {
            messages['help.contacts'] = 'At least one contact of each of the ' +
                'following types must be provided: ' + requiredContactTypes.join(', ') + '.';
        }

        return { messages: messages };
    },

    getDefaultData: function () {
        return assign({}, this.resolveMessages(), {
            listing: _listing,
            imageErrors: imageErrors
        });
    },

    currentUserCanEdit: function () {
        return this.currentUser && this.currentUser.canEdit(_listing);
    },

    getChangeLogs: function () {
        return GlobalListingStore.getChangeLogsForListing(_listing.id);
    },

    getReviews: function () {
        return GlobalListingStore.getReviewsForListing(_listing);
    },

    loadListing: function (id) {
        var deferred = $.Deferred(),
            promise = deferred.promise(),
            intId = parseInt(id, 10);

        if (id) {
            if (_listing && _listing.id === intId) {
                this.trigger({listing: _listing});
                return deferred.resolve(_listing);
            }

            var listing = GlobalListingStore.getCache()[id];
            if (listing) {
                this.refreshListing(cloneDeep(listing));
                deferred.resolve(_listing);
            } else {
                ListingApi.getById(id).then(l => {
                    this.refreshListing(cloneDeep(l));
                    deferred.resolve(_listing);
                });
            }
        } else {
            this.refreshListing(new Listing({ owners: [this.currentUser] }));
            deferred.resolve(_listing);
        }

        return promise;
    },

    /**
     * saves all of the images in the _listing object and updates the corresponding ids
     * in the _listing object.  Returns a promise that resolves when everything is complete
     */
    saveImages: function() {
        function optionalPromise(image, property, marking) {

            var markingLabel;
            var promise;

            if (property[0] === 'screenshots') {
                var index = parseInt(property[1]);
                markingLabel = property[2] + 'Marking';
                promise = image && _listing.screenshots[index][markingLabel] ? ImageApi.save(image, marking) : null;
            } else {
                markingLabel = property + 'Marking';
                promise = image && _listing[markingLabel] ? ImageApi.save(image, marking) : null;
            }

            if (promise) {
                promise.fail(me.handleImageSaveFailure.bind(me, property));
            }

            return promise;
        }

        //reset image errors object
        imageErrors = {screenshots: []};

        var me = this,
            {smallIcon, largeIcon, bannerIcon, featuredBannerIcon, screenshots,
             smallIconMarking, largeIconMarking, bannerIconMarking, featuredBannerIconMarking} = _listing,

            smallIconPromise = optionalPromise(smallIcon, 'smallIcon', smallIconMarking),
            largeIconPromise = optionalPromise(largeIcon, 'largeIcon', largeIconMarking),
            bannerIconPromise = optionalPromise(bannerIcon, 'bannerIcon', bannerIconMarking),
            featuredBannerIconPromise =
                optionalPromise(featuredBannerIcon, 'featuredBannerIcon', featuredBannerIconMarking),

            screenshotPromises = _.flatten(screenshots.map(
                (s, i) => [
                    optionalPromise(s.smallImage, ['screenshots', i, 'smallImage'], s.smallImageMarking),
                    optionalPromise(s.largeImage, ['screenshots', i, 'largeImage'], s.largeImageMarking)
                ]
            )),
            promises = [
                smallIconPromise,
                largeIconPromise,
                bannerIconPromise,
                featuredBannerIconPromise
            ].concat(screenshotPromises);

        return $.when(...promises).then(me.handleImageSaveResponses.bind(me));
    },

    /**
     * Handle responses for the image saves
     */
    handleImageSaveResponses: function(
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
            smallIconResponse = JSON.parse(smallIconResponse);
            _listing.smallIcon = null;
            _listing.smallIconId = smallIconResponse.id;
            _listing[listingIconPropertyUrlMap.smallIcon] = API_URL + '/api/image/' + _listing.smallIconId;
        }
        if (largeIconResponse) {
            largeIconResponse = JSON.parse(largeIconResponse);
            _listing.largeIcon = null;
            _listing.largeIconId = largeIconResponse.id;
            _listing[listingIconPropertyUrlMap.largeIcon] = API_URL + '/api/image/' + _listing.largeIconId;
        }
        if (bannerIconResponse) {
            bannerIconResponse = JSON.parse(bannerIconResponse);
            _listing.bannerIcon = null;
            _listing.bannerIconId = bannerIconResponse.id;
            _listing[listingIconPropertyUrlMap.bannerIcon] = API_URL + '/api/image/' + _listing.bannerIconId;
        }
        if (featuredBannerIconResponse) {
            featuredBannerIconResponse = JSON.parse(featuredBannerIconResponse);
            _listing.featuredBannerIcon = null;
            _listing.featuredBannerIconId = featuredBannerIconResponse.id;
            _listing[listingIconPropertyUrlMap.largeBannerIcon] = API_URL + '/api/image/' +
                _listing.featuredBannerIconId;
        }

        _listing.screenshots =
            _.zip(_listing.screenshots, screenshotResponses).map(function(screenshot) {
                var existing = screenshot[0],
                    responses = screenshot[1],
                    smallResp = responses ? JSON.parse(responses.smallImageResponse) : null,
                    largeResp = responses ? JSON.parse(responses.largeImageResponse) : null,
                    newScreenshot = Object.assign({}, existing);

                if (smallResp) {
                    newScreenshot.smallImage = null;
                    newScreenshot.smallImageId = smallResp.id;
                    newScreenshot[screenshotPropertyUrlMap.smallImage] =
                        API_URL + '/api/image/' + newScreenshot.smallImageId;
                }

                if (largeResp) {
                    newScreenshot.largeImage = null;
                    newScreenshot.largeImageId = largeResp.id;
                    newScreenshot[screenshotPropertyUrlMap.largeImage] =
                        API_URL + '/api/image/' + newScreenshot.largeImageId;
                }

                return newScreenshot;
            });
    },

    /**
     * If the save of any image fails, handle it with this function.  This function is meant
     * to be partially applied, so that its 2nd - 4th args match up for being a promise failure
     * handler
     */
    handleImageSaveFailure: function(property, response, err, statusText) {
        var json = JSON.parse(response.responseText),
            jsonMessage = json ? json.security_marking[0] : null,
            errorMessage = jsonMessage || statusText ||
                'Unknown error saving image';

        if (!_.isArray(property)) {
            property = [property];
        }

        updateValue(imageErrors, property, errorMessage);
        this.trigger({imageErrors: imageErrors, saveStatus: null});

        this.generateAlert(property, errorMessage);
    },

    /**
     * Build and output error message via SweetAlert.
     */
    generateAlert: function(property, errorMessage) {
        if (errorMessage.substring(0, 8) == 'Security') {

            property = _.last(property);

            if (property == 'smallImage') {
                property = 'Preview Image';
            } else if (property == 'largeImage') {
                property = 'Full Size Image';
            } else {
                property = humps.decamelize(property);
                property = property.replace('_', ' ');
                property = toTitleCase(property);
            }

            var msg = property + ' ' + errorMessage.toLowerCase();

            /* jshint ignore:start */
            sweetAlert({
                title: "Could not save!",
                text: "Your listing could not be saved: " + msg,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "ok",
                closeOnConfirm: true,
                html: false
            });
            /* jshint ignore:end */
        }
    }
});

module.exports = CurrentListingStore;
