'use strict';

var Reflux    = require('reflux'),
    ConfigApi = require('../data/Config').ConfigApi;

var fetchConfig   = Reflux.createAction(),
    configFetched = Reflux.createAction();

fetchConfig.listen(function () {
    ConfigApi.getConfig().then(function (config) {
        configFetched(config);
    });
});

module.exports = {
    fetchConfig: fetchConfig,
    configFetched: configFetched
};
