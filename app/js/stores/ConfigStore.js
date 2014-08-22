'use strict';

var Reflux        = require('reflux'),
    configFetched = require('../actions/ConfigActions').configFetched;

var _config = {loading: true};

var ConfigStore = Reflux.createStore({
    init: function () {
        this.listenTo(configFetched, function (config) {
            _config = config;
            this.trigger();
        });
    },

    getConfig: function () {
        return _config;
    }
});

module.exports = ConfigStore;
