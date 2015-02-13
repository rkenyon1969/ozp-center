'use strict';

var Reflux = require('reflux');
var { capitalize } = require('../utils/string');
var SystemApi = require('../webapi/System');

var items = [
    'types',
    'categories',
    'intents',
    'contactTypes',
    'organizations',
    'users'
];

var _system = {};

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
        );

        $.when.apply($, promises).then(() => {
            this.trigger({ system: _system });
        });
    }
});

module.exports = SystemStore;
