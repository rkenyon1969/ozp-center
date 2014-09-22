'use strict';

var $ = require('jquery');

var ProfileApi = {

    addToLibrary: function (json) {
        return $.ajax({
            url: API_URL + '/api/profile/self/library',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json)
        });
    }

};

module.exports.ProfileApi = ProfileApi;
