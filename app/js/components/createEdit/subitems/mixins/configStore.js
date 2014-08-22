'use strict';

var React       = require('react'),
    ConfigStore = require('../../../../stores/ConfigStore');

module.exports = {
    getInitialState: function () {
        return {config: ConfigStore.getConfig()};
    },

    handleConfigStoreChange: function () {
        this.replaceState({config: ConfigStore.getConfig()});
    },

    componentDidMount: function () {
        this.listenTo(ConfigStore, this.handleConfigStoreChange);
    },

    configIsLoading: function () {
        return this.state.config.loading;
    }
};
