'use strict';

var $ = require('jquery');

var ProfileApi = {

    addToLibrary: function (json) {
        return $.ajax({
            url: 'http://localhost:8080/marketplace/api/profile/self/library',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json)
        });
    }

};

module.exports.ProfileApi = ProfileApi;
