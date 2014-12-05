'use strict';

var createAction = require('reflux').createAction;
var _ = require('./_');

function createAsyncActions(definitions) {
    return _.reduce(definitions, function (actions, callback, name) {
        actions[name] = createAction();
        actions[name].listen(callback);
        actions[name + 'Completed'] = createAction();
        actions[name + 'Failed'] = createAction();

        return actions;
    }, {});
}

module.exports = createAsyncActions;
