'use strict';

var Reflux = require('reflux');
var {capitalize} = require('../utils/string');
var ConfigApi = require('../webapi/System');
var _ = require('../utils/_');
var $ = require('jquery');

var _config = {
    loaded: false
};

var configItems = [

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
