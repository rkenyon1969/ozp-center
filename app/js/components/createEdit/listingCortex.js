'use strict';

var Cortex     = require('cortexjs'),
    _findIndex = require('lodash/arrays/findIndex'),
    Listing    = require('./schema/listing'),
    Contact    = require('./schema/contact'),
    Screenshot = require('./schema/screenshot');

module.exports = function (config, data) {
    data = data || {};

    var listing = new Listing(data);

    var requiredTypes = [],
        newContacts = [];

    config.contactTypes.forEach(function (type) {
        if (type.required) {
            requiredTypes.push(type);
        }
    });

    requiredTypes.forEach(function (type, index) {
        var requiredIndex = _findIndex(listing.contacts, function (contact) {
            return contact.type.id === type.id;
        });

        if (requiredIndex > -1) {
            newContacts.push(listing.contacts.splice(requiredIndex, 1));
        } else {
            var contact = new Contact();
            contact.type.id = type.id;
            newContacts.push(contact);
        }
    });

    listing.contacts = newContacts.splice(listing.contacts);

    if (listing.screenshots.length < 1) {
        listing.screenshots.push(new Screenshot());
    }

    return new Cortex(listing);
};
