'use strict';

var Reflux        = require('reflux'),
    configFetched = require('../actions/ConfigActions').configFetched;

var _config = null;

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
