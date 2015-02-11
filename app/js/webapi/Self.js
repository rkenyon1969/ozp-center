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
    },

    fetchNotifications() {
        return $.getJSON(API_URL + '/api/profile/self/notification').then(function (response) {
            return new Response(response, function (json) {
                json.expiresDate = new Date(json.expiresDate);
                return json;
            });
        });
    },

    dismissNotification(notificationId) {
        return $.ajax({
            url: `${API_URL}/api/profile/self/notification/${notificationId}`,
            type: 'delete'
        });
    }
};

module.exports.SelfApi = SelfApi;
