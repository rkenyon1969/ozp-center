'use strict';

var Cortex       = require('cortexjs'),
    Defaults     = require('../../../utils/defaults'),
    SimpleSchema = require('./simple');

module.exports = new Defaults({
    dataType: SimpleSchema,
    action: SimpleSchema
});
