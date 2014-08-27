'use strict';

var Cortex     = require('cortexjs'),
    _findIndex = require('lodash/arrays/findIndex'),
    Listing    = require('./schema/listing'),
    Contact    = require('./schema/contact'),
    Screenshot = require('./schema/screenshot'),
    Resource   = require('./schema/resource');

module.exports = function (config, data) {
    data = data || {};

    var listing = new Listing(data);

    /**
     *     Add Required Contacts
     */
    var requiredContacts = [];

    var requiredContactTypes = config.contactTypes.filter(function (type) {
        return type.required;
    });

    requiredContactTypes.forEach(function (type, index) {
        var requiredIndex = _findIndex(listing.contacts, function (contact) {
            return contact.type.id === type.id;
        });

        if (requiredIndex > -1) {
            requiredContacts.push(listing.contacts.splice(requiredIndex, 1));
        } else {
            var contact = new Contact();
            contact.type.id = type.id;
            requiredContacts.push(contact);
        }
    });

    listing.contacts = requiredContacts.splice(listing.contacts);

    /**
     *     Add Required Screenshots
     */
    if (listing.screenshots.length < 1) {
        listing.screenshots.push(new Screenshot());
    }

    /**
     *     Set the Default Listing Type
     */
    if (!listing.types.id) {
        listing.types.id = config.defaultType.id;
    }

    /**
     *     Add Suggested Resources
     */
    var suggestedResources = [];

    ['User Manual', 'API Documentation'].forEach(function (name) {
        var index = _findIndex(listing.docUrls, function (resource) {
            return resource.name === name;
        });

        if (index > -1) {
            suggestedResources.push(listing.docUrls.splice(index, 1));
        } else {
            var resource = new Resource();
            resource.name = name;
            suggestedResources.push(resource);
        }
    });

    listing.docUrls = suggestedResources.splice(listing.docUrls);

    return new Cortex(listing);
};
