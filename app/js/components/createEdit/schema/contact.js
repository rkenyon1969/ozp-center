'use strict';

var Cortex       = require('cortexjs'),
    Defaults     = require('../../../utils/defaults'),
    SimpleSchema = require('./simple');

var str = Defaults.str;

module.exports = new Defaults({
    name: str(),
    securePhone: str(),
    unsecurePhone: str(),
    email: str(),
    organization: str(),
    type: SimpleSchema
});
