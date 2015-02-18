'use strict';

var $ = require('jquery');
var { API_URL } = require('ozp-react-commons/OzoneConfig');

module.exports = {
    search: function(term) {
        return $.getJSON(
            `${API_URL}/api/profile?usernameStartsWith=${encodeURIComponent(term)}`
        ).then(function(response) {
            var embedded = response._embedded || {},
                items = embedded.item ? [].concat(embedded.item) : [];

            return items;
        });
    }
};
