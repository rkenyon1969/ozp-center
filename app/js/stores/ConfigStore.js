'use strict';

var Reflux = require('reflux');
var capitalize = require('../utils/string').capitalize;
var ConfigApi = require('../webapi/Config').ConfigApi;

var _config = {
    loaded: false
};

var configItems = [
    'types',
    'categories',
    'intents',
    'contactTypes',
    'organizations',
    'users'
];

var ConfigStore = Reflux.createStore({
    init: function () {
        var me = this;

        configItems.forEach(function (item) {
            ConfigApi['get' + capitalize(item)]()
                .then(function (data) {
                    _config[item] = data;
                    me.updateLoaded();
                    me.trigger();
                });
        });
    },

    getConfig: function () {
        return _config;
    },

    updateLoaded: function () {
        _config.loaded = configItems.every(function (item) {
            return !!_config[item];
        }, this);
    }
});

module.exports = ConfigStore;