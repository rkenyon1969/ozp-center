'use strict';

var SelfStore = require('../stores/SelfStore');

var AdminRouteMixin = {

    statics: {
        willTransitionTo: function (transition, component) {
            if (!SelfStore.getCurrentUser().isAdmin) {
                transition.abort();
                transition.redirect('/');
            }
        }
    }

};

module.exports = AdminRouteMixin;
