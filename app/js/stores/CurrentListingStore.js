'use strict';

var { createStore } = require('reflux');
var GlobalListingStore = require('./GlobalListingStore');
var SystemStore = require('./SystemStore');
var actions = require('../actions/CreateEditActions');
var { save } = require('../actions/ListingActions');
var { validateDraft, validateFull } = require('../components/createEdit/validation/listing');
var { listingMessages } = require('../constants/messages');
var { Listing } = require('../webapi/Listing');
var { approvalStatus } = require('../constants');
var { cloneDeep, assign } = require('../utils/_');

actions.systemUpdated = SystemStore;
actions.cacheUpdated = GlobalListingStore;

var _listing = new Listing();
var _system = SystemStore.getDefaultData().system;
var _submitting = false;

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

    onLoadListing: function (id) {
        this.refreshListing(
            id ? 
            cloneDeep(GlobalListingStore.getById(id)) || new Listing({ id: id }) : 
            new Listing()
        );
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
        var { errors, isValid } = validateDraft(_listing, _system);
        return {
            isValid: isValid,
            errors: errors,
            warnings: validateFull(_listing, _system).errors
        };
    },

    getFullValidation: function () {
        var { errors, isValid } = validateFull(_listing, _system);
        return {
            errors: errors,
            isValid: isValid,
            warnings: {}
        };
    },

    onSystemUpdated: function (data) {
        if (data.system) {
            _system = data.system;
        }

        this.trigger({ messages: this.resolveMessages() });
    },

    resolveMessages: function () {
        var messages = listingMessages;
        var requiredContactTypes = _system.contactTypes.filter(t => t.required).map(t => t.title);

        if (requiredContactTypes.length > 0) {
            messages['help.contacts'] = 'At least one contact of each of the ' + 
                'following types must be provided: ' + requiredContactTypes.join(', ') + '.';
        }

        return messages;
    },

    getDefaultData: function () {
        return { listing: _listing, errors: {}, warnings: {}, messages: listingMessages, isValid: true, firstError: {} };
    }
});

module.exports = CurrentListingStore;