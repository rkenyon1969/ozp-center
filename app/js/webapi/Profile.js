'use strict';

var $ = require('jquery');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var ProfileApi = {

    getStewards: function() {
        return $.getJSON(API_URL + '/api/profile?role=ORG_STEWARD');
    }
};


module.exports = ProfileApi;
