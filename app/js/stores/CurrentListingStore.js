'use strict';

var Reflux = require('reflux');
var cache = require('./GlobalListingStore');
var system = require('./SystemStore');
var actions = require('../actions/CreateEditActions');
var {save} = require('../actions/ListingActions');
var {validateDraft, validateFull} = require('../validation/listing');
var {listingMessages} = require('../constants/messages');
var ListingSchema = require('../webapi/Listing').Listing;
var approvalStatus = require('../constants').approvalStatus;

var _listing = new ListingSchema().toObject();
var _system = null;
var _submitting = false;

var CurrentListingStore = Reflux.createStore({
    listenables: Object.assign({}, actions, {cacheUpdated: cache, systemUpdated: system}),

    onListingCreated: function (listing) {
        _listing = listing.toObject();
        _submitting = false;
        this.trigger(Object.assign(this.doValidation(), {listing: _listing, validationFailed: false, hasChanges: false}));
    },

    onLoadListing: function (id) {
        if (id) {
            var listing = cache.getById(id);
            _listing = listing ? listing.toObject() : new ListingSchema({id: id}).toObject();
        } else {
            _listing = new ListingSchema().toObject();
        }

        this.trigger(Object.assign(this.doValidation(), {listing: _listing}));
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
        this.trigger(Object.assign(this.doValidation(), {listing: _listing, hasChanges: true}));
    },

    onCacheUpdated: function () {
        if (_listing.id) {
            var listing = cache.getById(_listing.id);
            if (listing) {
                _listing = listing.toObject();
                _submitting = false;
                this.trigger(Object.assign(this.doValidation(), {listing: _listing, validationFailed: false, hasChanges: false}));
            }
        }
    },

    onSystemUpdated: function (data) {
        _system = data.system;
        this.trigger(this.doValidation());
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
            console.log(validation);
        } else {
            save(_listing);
        }
    },

    doValidation: function () {
        var status = approvalStatus[_listing.approvalStatus],
            isDraft = !_submitting && (!status || status === approvalStatus.IN_PROGRESS);

        var warnings = validateFull(_listing, _system).errors;
        var {errors, isValid, firstError} = isDraft ? validateDraft(_listing, _system) : validateFull(_listing, _system);

        return {errors: errors, warnings: warnings, isValid: isValid, messages: listingMessages, firstError: firstError};
    },

    getDefaultData: function () {
        return { listing: _listing, errors: {}, warnings: {}, messages: {}, validationFailed: false, firstError: {}};
    }
});

module.exports = CurrentListingStore;