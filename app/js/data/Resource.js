'use strict';

var merge = require('react/lib/merge');

var schema = {
    name: '',
    url: ''
};

function Resource(json) {
    return merge(schema, json);
}

module.exports = Resource;
