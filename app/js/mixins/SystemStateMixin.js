'use strict';

var Reflux = require('reflux');
var SystemStore = require('../stores/SystemStore');

module.exports = {
    mixins: [Reflux.connect(SystemStore)],

    getInitialState: function () {
        return SystemStore.getDefaultData();
    }
};