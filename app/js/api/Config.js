'use strict';

var $ = require('jquery');

function getData (response) {
    return response.data || response;
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON(API_URL + '/api/type').pipe(getData);
    },

    getCategories: function () {
        return $.getJSON(API_URL + '/api/category').pipe(getData);
    },

    getIntents: function () {
        return $.getJSON(API_URL + '/api/intent').pipe(getData);
    },

    getContactTypes: function () {
        return $.getJSON(API_URL + '/api/contactType').pipe(getData);
    },

    getOrganizations: function () {
        return $.getJSON(API_URL + '/api/agency').pipe(getData);
    },

    getUsers: function () {
        return $.getJSON(API_URL + '/api/profile').pipe(getData);
    }

};

module.exports.ConfigApi = ConfigApi;
