'use strict';

var createAction = require('reflux').createAction;
var _ = require('./_');

function createAsyncActions(definitions) {
    return _.reduce(definitions, function (actions, callback, name) {
        actions[name] = createAction({ sync: true });
        if (callback) { actions[name].listen(callback); }
        actions[name + 'Completed'] = createAction({ sync: true });
        actions[name + 'Failed'] = createAction({ sync: true });

        return actions;
    }, {});
}

module.exports = createAsyncActions;
