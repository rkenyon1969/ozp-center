'use strict';

var $ = require('jquery');
var humps = require('humps');
var _ = require('../utils/_');
var Response = require('./responses/Response');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

function parse (response) {
    return new Response(response).getItemAsList();
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON(API_URL + '/api/type/').pipe(parse);
    },

    getCategories: function () {
        return $.getJSON(API_URL + '/api/category/').pipe(parse);
    },

    getIntents: function () {
        return $.getJSON(API_URL + '/api/intent/').pipe(parse);
    },

    getContactTypes: function () {
        return $.getJSON(API_URL + '/api/contactType/').pipe(parse);
    },

    getOrganizations: function () {
        return $.getJSON(API_URL + '/api/agency/').pipe(parse);
    },

    getUsers: function () {
        return $.getJSON(API_URL + '/api/self/profile/').pipe(parse);
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
                contactTypes: _.map(response.contactTypes, 'name'),
                organizations: response.agencies
            };
        });
    }

};

module.exports = ConfigApi;
