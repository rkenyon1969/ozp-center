'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var ProfileApi = {

    getStewards: function() {
        return $.getJSON(API_URL + '/api/self/profile?role=ORG_STEWARD')
            .then((response) => {
                return new Response(response).getItemAsList();
            });
    }
};


module.exports = ProfileApi;
