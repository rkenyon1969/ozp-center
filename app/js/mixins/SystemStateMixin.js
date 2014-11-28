'use strict';

var Reflux = require('reflux');
var SystemStore = require('../stores/SystemStore');
var ProfileStore = require('../stores/ProfileStore');

module.exports = {
    mixins: [Reflux.connect(SystemStore), Reflux.connect(ProfileStore)],

    getInitialState: function () {
        return Object.assign({}, SystemStore.getDefaultData(), ProfileStore.getDefaultData());
    }
};