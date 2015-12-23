'use strict';

var $ = require('jquery');
var { API_URL } = require('ozp-react-commons/OzoneConfig');
var humps = require('humps');
var _ = require('../utils/_');

module.exports = {
    search: function(term) {
        return $.getJSON(
            `${API_URL}/api/profile/?search=${encodeURIComponent(term)}`
        ).then(resp => {
            resp = humps.camelizeKeys(resp);

            _.map(resp, x => {
                x.username = x.user.username;
                x.email = x.user.email;
                x.groups = x.user.groups;
                delete x.user;
            });

            return resp;
        });
    }
};
