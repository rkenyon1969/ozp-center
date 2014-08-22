'use strict';

var $ = require('jquery');

var ConfigApi = {
    getConfig: function () {
        return $.getJSON('./mocks/config.json');
    }
};

module.exports.ConfigApi = ConfigApi;
