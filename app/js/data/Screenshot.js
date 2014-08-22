'use strict';

var merge = require('react/lib/merge');

var schema = {
    smallImageUrl: '',
    largeImageUrl: ''
};

function Screenshot(json) {
    return merge(schema, json);
}

module.exports = Screenshot;
