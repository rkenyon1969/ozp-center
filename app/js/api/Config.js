'use strict';

var $ = require('jquery');

function getData (response) {
    return response.data;
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/type').pipe(getData);
    },

    getCategories: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/category').pipe(getData);
    },

    getIntentActions: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/intentAction').pipe(getData);
    },

    getIntentDataTypes: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/intentDataType').pipe(getData);
    },

    getContactTypes: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/contactType').pipe(getData);
    },

    getOrganizations: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/agency').pipe(getData);
    },

    getUsers: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/profile').pipe(getData);
    }

};

module.exports.ConfigApi = ConfigApi;
