'use strict';

var merge  = require('react/lib/merge');

var schema = {
    dataType: '',
    action: ''
};

function Intent(json) {
    return merge(schema, json);
}

module.exports = Intent;
