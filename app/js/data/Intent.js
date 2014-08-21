'use strict';

var merge = require('react/lib/merge');

var schema = {
    dataType: {id: null},
    action: {id: null}
};

function Intent(json) {
    return merge(schema, json);
}

module.exports = Intent;
