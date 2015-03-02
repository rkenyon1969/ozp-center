'use strict';

var assign = require('object-assign');

var Reflux = require('reflux');
var { capitalize } = require('../utils/string');
var SystemApi = require('../webapi/System');

var items = ['stewards'];

var _system = {
    categories: [],
    types: [],
    intents: [],
    contactTypes: [],
    organizations: [],
    stewards: []
};

var SystemStore = Reflux.createStore({
    init: function () {
        items.forEach(item => {
            _system[item] = [];
        });

        this.loadSystem();
    },

    getSystem: function () {
        return _system;
    },

    getDefaultData: function () {
        return { system: _system };
    },

    loadSystem: function () {
        var promises = items.map(item =>
                SystemApi['get' + capitalize(item)]().then(data => {
                    _system[item] = data;
                })
            ).concat(
                SystemApi.getMetadata().then(data => assign(_system, data))
            );

        $.when.apply($, promises).then(() => {
            this.trigger({ system: _system });
        });
    }
});

module.exports = SystemStore;
