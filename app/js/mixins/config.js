'use strict';

var Reflux = require('reflux');
var capitalize = require('../utils/string').capitalize;
var ConfigApi = require('../webapi/Config').ConfigApi;

var _config = {
    loaded: false
};

var configFetched = false;

var configItems = [
    'types',
    'categories',
    'intents',
    'contactTypes',
    'organizations',
    'users'
];

//Create two actions for each config item - fetchItem and itemFetched.
var Actions = Reflux.createActions(configItems.map(function (item) {
    return ['fetch' + capitalize(item), item + 'Fetched']; //create the action names
}).reduce(function (a, b) {
    return a.concat(b); //flatten the array
}));

//Each of the "fetchItem" actions invokes the appropriate API call then passes the data
//to the "itemFetched" action
configItems.forEach(function (item) {
    Actions['fetch' + capitalize(item)].listen(function () {
        ConfigApi['get' + capitalize(item)]().then(function (data) {
            Actions[item + 'Fetched'](data);
        });
    });
});

//fetchConfig simply calls all of the "fetchItem" actions - should be called from the top
//level component
Actions.fetchConfig = Reflux.createAction();

Actions.fetchConfig.listen(function () {
    configItems.forEach(function (item) {
        Actions['fetch' + capitalize(item)]();
    });
});

var ConfigStore = Reflux.createStore({
    init: function () {
        configItems.forEach(function (item) {
            this.listenTo(Actions[item + 'Fetched'], function (items) {
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
        _config.loaded = configItems.every(function (item) {
            return !!_config[item];
        }, this);
    }
});

//Any component that needs access to the global config should include
//this mixin - then config can be access via state.config
module.exports = {
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {config: ConfigStore.getConfig()};
    },

    handleConfigStoreChange: function () {
        this.setState({config: ConfigStore.getConfig()});
    },

    componentWillMount: function () {
        configFetched = true;
        Actions.fetchConfig();
    },

    componentDidMount: function () {
        this.listenTo(ConfigStore, this.handleConfigStoreChange);
    }
};
