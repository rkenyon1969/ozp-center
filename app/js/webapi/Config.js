'use strict';

var $ = require('jquery');

function parse (response) {
    var data = (response._embedded && response._embedded.item) || response.data || response;
    return [].concat(data); //normalize to an array
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
    }

};

module.exports.ConfigApi = ConfigApi;
