'use strict';

var $ = require('jquery');

function getData(response) { return response.data; }

var mock = true;

var DATA_PATH = mock ? './mocks/' : 'http://localhost:8080/marketplace/api/';

var ConfigApi = {
    getTypes: function () {
        return $.getJSON(DATA_PATH + (mock ? 'type.json' : 'type')).pipe(getData);
    },

    getCategories: function () {
        return $.getJSON(DATA_PATH + (mock ? 'category.json' : 'category')).pipe(getData);
    },

    getIntentActions: function () {
        return $.getJSON(DATA_PATH + (mock ? 'intentAction.json' : 'intentAction')).pipe(getData);
    },

    getIntentDataTypes: function () {
        return $.getJSON(DATA_PATH + (mock ? 'intentDataType.json' : 'intentDataType')).pipe(getData);
    },

    getContactTypes: function () {
        return $.getJSON(DATA_PATH + (mock ? 'contactType.json' : 'contactType')).pipe(getData);
    },

    getOrganizations: function () {
        return $.getJSON(DATA_PATH + (mock ? 'agency.json' : 'agency')).pipe(getData);
    },

    getUsers: function () {
        return $.getJSON(DATA_PATH + (mock ? 'profile.json' : 'profile')).pipe(getData);
    }
};

module.exports.ConfigApi = ConfigApi;
