'use strict';

var { createStore } = require('reflux');
var GlobalListingStore = require('./GlobalListingStore');
var SystemStore = require('./SystemStore');
var actions = require('../actions/CreateEditActions');
var { save } = require('../actions/ListingActions');
var { validateDraft, validateFull } = require('../validation/listing');
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

    onListingCreated: function (listing) {
        _listing = cloneDeep(listing);
        _submitting = false;
        this.trigger(assign(this.doValidation(), { listing: _listing, validationFailed: false, hasChanges: false }));
    },

    onLoadListing: function (id) {
        if (id) {
            var listing = GlobalListingStore.getById(id);
            _listing = listing ? cloneDeep(listing) : new Listing({ id: id });
        } else {
            _listing = new Listing();
        }

        this.trigger(assign(this.doValidation(), { listing: _listing }));
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
        this.trigger(assign(this.doValidation(), { listing: _listing, hasChanges: true }));
    },

    onCacheUpdated: function () {
        if (_listing.id) {
            var listing = GlobalListingStore.getById(_listing.id);
            if (listing) {
                _listing = (listing);
                _submitting = false;
                this.trigger(assign(this.doValidation(), { listing: _listing, validationFailed: false, hasChanges: false }));
            }
        }
    },

    onSystemUpdated: function (data) {
        if (data.system) {
            _system = data.system;
        }

        this.trigger(assign({ messages: this.resolveMessages() }, this.doValidation()));
    },

    onSubmit: function () {
        _submitting = true;

        var validation = this.doValidation();
        if(!validation.isValid) {
            validation.validationFailed = true;
            this.trigger(validation);
        } else {
            _listing.approvalStatus = 'PENDING';
            save(_listing);
        }
    },

    onSave: function () {
        _submitting = false;

        var validation = this.doValidation();
        if(!validation.isValid) {
            validation.validationFailed = true;
            this.trigger(validation);
        } else {
            save(_listing);
        }
    },

    doValidation: function () {
        var status = approvalStatus[_listing.approvalStatus],
            isDraft = !_submitting && (!status || status === approvalStatus.IN_PROGRESS);

        var warnings = validateFull(_listing, _system).errors;
        var { errors, isValid, firstError } = isDraft ? validateDraft(_listing, _system) : validateFull(_listing, _system);

        return { errors: errors, warnings: warnings, isValid: isValid, firstError: firstError };
    },

    resolveMessages: function () {
        var messages = listingMessages;
        var requiredContactTypes = _system.contactTypes.filter(t => t.required).map(t => t.title);

        if (requiredContactTypes.length > 0) {
            messages['help.contacts'] = 'Contacts are not required to save a draft. ' +
                'In order to submit the listing, at least one contact of each of the ' + 
                'following types must be provided: ' + requiredContactTypes.join(', ') + '.';
        }

        return messages;
    },

    getDefaultData: function () {
        return { listing: _listing, errors: {}, warnings: {}, messages: listingMessages, validationFailed: false, firstError: {} };
    }
});

module.exports = CurrentListingStore;