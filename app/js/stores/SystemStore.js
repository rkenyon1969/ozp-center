'use strict';

var Reflux = require('reflux');
var {capitalize} = require('../utils/string');
var SystemApi = require('../webapi/Config');
var _ = require('../utils/_');

var items = [
    'types',
    'categories',
    'intents',
    'contactTypes',
    'organizations',
    'users'
];

var _cache = {};

var SystemStore = Reflux.createStore({
    init: function () {
        items.forEach(item => {
            _cache[item] = [];
        });

        var promises = items.map(item =>
            SystemApi['get' + capitalize(item)]().then(data => {
                _cache[item] = data;
            })
        );

        $.when.apply($, promises).then(data => {
            this.trigger({system: _cache});
        });
    },

    getDefaultData: function () {
        return {system: _cache};
    }
});

module.exports = SystemStore;
