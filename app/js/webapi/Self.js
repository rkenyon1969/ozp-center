'use strict';

var $ = require('jquery');

var { API_URL } = require('ozp-react-commons/OzoneConfig');
var Response = require('./responses/Response.js');

var SelfApi = {

    addToLibrary(json) {
        return $.ajax({
            url: API_URL + '/api/profile/self/library',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json)
        });
    },

    removeFromLibrary(listing) {
    	return $.ajax({
            url: API_URL + '/api/profile/self/library/' + listing.id,
            type: 'delete'
        });
    },

    getLibrary() {
    	return $.getJSON(API_URL + '/api/profile/self/library');
    },

    getSelf() {
        return $.getJSON(API_URL + '/api/profile/self');
    }
};

module.exports.SelfApi = SelfApi;
