'use strict';

var Cortex       = require('cortexjs'),
    Defaults     = require('../../../utils/defaults');

var str = Defaults.str;

module.exports = new Defaults({
    name: str(),
    securePhone: str(),
    unsecurePhone: str(),
    email: str(),
    organization: str(),
    type: str()
});
