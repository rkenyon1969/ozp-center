'use strict';

var $ = require('jquery');
var { API_URL } = require('ozp-react-commons/OzoneConfig');
var { PAGINATION_MAX } = require('ozp-react-commons/constants');

var PaginatedResponse  =require ('./responses/PaginatedResponse');

function parse (json) {
    json.expiresDate = new Date(json.expiresDate);
    return json;
}

module.exports = {
    create(notification) {
        return $.ajax({
            url: `${API_URL}/api/notification`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(notification)
        }).then(parse);
    },

    update(notification) {
        return $.ajax({
            url: `${API_URL}/api/notification/` + notification.id,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(notification)
        }).then(parse);
    },

    fetchActive() {
        return $.getJSON(`${API_URL}/api/notification/pending`)
            .then((response) => new PaginatedResponse(response, parse));
    },

    fetchPast(url) {
        url = url || `${API_URL}/api/notification/expired?offset=0&max=${PAGINATION_MAX}`;
        return $.getJSON(url)
            .then((response) => new PaginatedResponse(response, parse));
    }
};
