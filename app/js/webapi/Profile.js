'use strict';

var $ = require('jquery');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {
    getOwnedListings: function (profileId) {
    	return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}/library`);
    },

    getProfile: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}`);
    }
};

module.exports.ProfileApi = ProfileApi;
