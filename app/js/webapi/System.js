'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

function parse (response) {
    return new Response(response).getItemAsList();
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON(API_URL + '/api/type').pipe(parse);
    },

    getCategories: function () {
        return $.getJSON(API_URL + '/api/category').pipe(parse);
    },

    getIntents: function () {
        return $.getJSON(API_URL + '/api/intent').pipe(parse);
    },

    getContactTypes: function () {
        return $.getJSON(API_URL + '/api/contactType').pipe(parse);
    },

    getOrganizations: function () {
        return $.getJSON(API_URL + '/api/agency').pipe(parse);
    },

    getUsers: function () {
        return $.getJSON(API_URL + '/api/profile').pipe(parse);
    },

    //a single call to get categories,
    //types, intents, contact types, and organizations
    getMetadata: function() {
        return $.getJSON(API_URL + '/api/metadata').then(function(response) {
            var embedded = response._embedded,
                categories = embedded && embedded['ozp:category'],
                types = embedded && embedded['ozp:type'],
                intents = embedded && embedded['ozp:intent'],
                contactTypes = embedded && embedded['ozp:contact-type'],
                organizations = embedded && embedded['ozp:organization'];

            return {
                categories: parse(categories),
                types: parse(types),
                intents: parse(intents),
                contactTypes: parse(contactTypes),
                organizations: parse(organizations)
            };
        });
    }

};

module.exports = ConfigApi;
