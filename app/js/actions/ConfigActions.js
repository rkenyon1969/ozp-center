'use strict';

var Reflux      = require('reflux'),
    ConfigApi   = require('../api/Config').ConfigApi,
    ConfigItems = require('../constants').configItems,
    capitalize  = require('../utils/string').capitalize;

//There are two actions for each item - fetchItem and itemFetched.
var Actions = Reflux.createActions(ConfigItems.map(function (item) {
    return ['fetch' + capitalize(item), item + 'Fetched']; //create the action names
}).reduce(function (a, b) {
    return a.concat(b); //flatten the array
}));

ConfigItems.forEach(function (item) {
    Actions['fetch' + capitalize(item)].listen(function () {
        ConfigApi['get' + capitalize(item)]().then(function (data) {
            Actions[item + 'Fetched'](data);
        });
    });
});

Actions.fetchConfig = Reflux.createAction();

Actions.fetchConfig.listen(function () {
    ConfigItems.forEach(function (item) {
        Actions['fetch' + capitalize(item)]();
    });
});

module.exports = Actions;
