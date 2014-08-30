'use strict';

var Reflux        = require('reflux'),
    configActions = require('../actions/ConfigActions'),
    ConfigItems   = require('../constants').configItems;

var _config = {
    loaded: false
};

var _configLoaded = false;

var ConfigStore = Reflux.createStore({
    init: function () {
        ConfigItems.forEach(function (item) {
            this.listenTo(configActions[item + 'Fetched'], function (items) {
                _config[item] = items;
                this.updateLoaded();
                this.trigger();
            });
        }, this);
    },

    getConfig: function () {
        return _config;
    },

    updateLoaded: function () {
        _config.loaded = ConfigItems.every(function (item) {
            return !!_config[item];
        }, this);
    }
});

var ConfigStoreMixin = {
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {config: ConfigStore.getConfig()};
    },

    handleConfigStoreChange: function () {
        this.setState({config: ConfigStore.getConfig()});
    },

    componentDidMount: function () {
        this.listenTo(ConfigStore, this.handleConfigStoreChange);
    }
};

module.exports = {
    store: ConfigStore,
    mixin: ConfigStoreMixin
};
