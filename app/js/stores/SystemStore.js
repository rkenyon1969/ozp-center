'use strict';

var Reflux = require('reflux');
var { capitalize } = require('../utils/string');
var SystemApi = require('../webapi/System');
var ProfileStore = require('./ProfileStore');
var _ = require('../utils/_');

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
    listenables: { profileChange: ProfileStore },

    init: function () {
        items.forEach(item => {
            _system[item] = [];
        });

        this.loadSystem();
    },

    onProfileChange: function (data) {
        var { currentUser } = data;
        if (currentUser) {
            this.trigger({ currentUser: currentUser });
        }
    },

    getDefaultData: function () {
        var { currentUser } = ProfileStore.getDefaultData();
        return { system: _system, currentUser: currentUser };
    },

    loadSystem: function () {
        items.forEach(item => {
            SystemApi['get' + capitalize(item)]().then(data => {
                _system[item] = data;
                this.trigger({ system: _system });
            });
        });
    }
});

module.exports = SystemStore;
