'use strict';

var $ = require('jquery');

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

actions.systemUpdated = SystemStore;
actions.cacheUpdated = GlobalListingStore;

var _listing = null;
var _submitting = false;

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
        if (_listing.id) {
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

        function updateValue (obj, path) {
            if (path.length === 1) {
                obj[path[0]] = value;
            } else {
                updateValue(obj[path[0]], path.slice(1));
            }
        }

        updateValue(_listing, propertyPath);

        var validation = this.doValidation();
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

        if(!validation.isValid) {
            _listing.approvalStatus = oldStatus;
            this.trigger(validation);
        } else {
            save(_listing);
        }
    },

    onSave: function () {
        _submitting = false;
        var validation = this.doValidation();

        if(!validation.isValid) {
            this.trigger(validation);
        } else {
            save(_listing);
        }
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
