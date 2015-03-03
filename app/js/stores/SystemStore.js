'use strict';

var assign = require('object-assign');

var Reflux = require('reflux');
var SystemApi = require('../webapi/System');

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
        this.loadSystem();
    },

    getSystem: function () {
        return _system;
    },

    getDefaultData: function () {
        return { system: _system };
    },

    loadSystem: function () {
        SystemApi.getMetadata().then(data => assign(_system, data))
            .then(() => this.trigger({system: _system }));
    }
});

module.exports = SystemStore;
