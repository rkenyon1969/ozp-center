'use strict';

var Reflux = require('reflux');
var {capitalize} = require('../utils/string');
var ConfigApi = require('../webapi/Config');
var _ = require('../utils/_');
var $ = require('jquery');

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
        this.loadConfig();
    },

    getConfig: function () {
        return _config;
    },

    loadConfig: function () {
        var me = this;

        var promises = configItems.map(function (item) {
            ConfigApi['get' + capitalize(item)]().then(function (data) {
                _config[item] = data;
            });
        });

        $.when.apply($, promises).then(function (data) {
            _config.loaded = true;
            me.trigger();
        });
    },

    getDefaultData: function () {
        return {config: _.zipObject(configItems.map(k => [k, []]))};
    }
});

module.exports = ConfigStore;
