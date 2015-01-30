'use strict';

var $ = require('jquery');

var { API_URL } = require('OzoneConfig');

var ProfileApi = {

    addToLibrary: function (json) {
        return $.ajax({
            url: API_URL + '/api/profile/self/library',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json)
        });
    },

    removeFromLibrary: function (listing) {
    	return $.ajax({
            url: API_URL + '/api/profile/self/library/' + listing.id,
            type: 'delete'
        });
    },

    getLibrary: function () {
    	return $.getJSON(API_URL + '/api/profile/self/library');
    },

    getSelf: function () {
        return $.getJSON(API_URL + '/api/profile/self');
    }
};

module.exports.ProfileApi = ProfileApi;
