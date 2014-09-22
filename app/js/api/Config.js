'use strict';

var $ = require('jquery');

function getData (response) {
    return response.data || response;
}

var ConfigApi = {

    getTypes: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/type').pipe(getData);
    },

    getCategories: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/category').pipe(getData);
    },

    getIntents: function () {
        return $.getJSON('http://localhost:8080/marketplace/api/intent').pipe(getData);
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
