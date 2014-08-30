'use strict';

var $ = require('jquery');

function getData(response) { return response.data; }

var API_PATH = 'http://localhost:8080/marketplace/api/';

var ConfigApi = {
    getTypes: function () {
        return $.getJSON(API_PATH + 'type').pipe(getData);
    },

    getCategories: function () {
        return $.getJSON(API_PATH + 'category').pipe(getData);
    },

    getIntentActions: function () {
        return $.getJSON(API_PATH + 'intentAction').pipe(getData);
    },

    getIntentDataTypes: function () {
        return $.getJSON(API_PATH + 'intentDataType').pipe(getData);
    },

    getContactTypes: function () {
        return $.getJSON(API_PATH + 'contactType').pipe(getData);
    },

    getOrganizations: function () {
        return $.getJSON(API_PATH + 'agency').pipe(getData);
    },

    getUsers: function () {
        return $.getJSON(API_PATH + 'profile').pipe(getData);
    }
};

module.exports.ConfigApi = ConfigApi;
