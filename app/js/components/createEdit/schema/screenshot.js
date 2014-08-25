'use strict';

var Cortex     = require('cortexjs'),
    Defaults   = require('../../../utils/defaults');

var str = Defaults.str;

module.exports = new Defaults({
    smallImageUrl: str(),
    largeImageUrl: str()
});
