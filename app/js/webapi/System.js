'use strict';

var $ = require('jquery');
var humps = require('humps');
var _ = require('../utils/_');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var ConfigApi = {

    getTypes: function () {
        return $.getJSON(API_URL + '/api/type/');
    },

    getCategories: function () {
        return $.getJSON(API_URL + '/api/category/');
    },

    getIntents: function () {
        return $.getJSON(API_URL + '/api/intent/');
    },

    getContactTypes: function () {
        return $.getJSON(API_URL + '/api/contactType/');
    },

    getOrganizations: function () {
        return $.getJSON(API_URL + '/api/agency/');
    },

    getUsers: function () {
        return $.getJSON(API_URL + '/api/self/profile/');
    },

    //a single call to get categories,
    //types, intents, contact types, and organizations
    getMetadata: function() {
        return $.getJSON(API_URL + '/api/metadata/').then(function(response) {
            response = humps.camelizeKeys(response);
            return {
                categories: response.categories,
                types: response.listingTypes,
                intents: response.intents,
                contactTypes: response.contactTypes,
                organizations: response.agencies
            };
        });
    }

};

module.exports = ConfigApi;
