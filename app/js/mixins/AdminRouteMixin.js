'use strict';

var ProfileStore = require('../stores/ProfileStore');

var AdminRouteMixin = {

    statics: {
        willTransitionTo: function (transition, component) {
            if (!ProfileStore.getCurrentUser().isAdmin) {
                transition.abort();
                transition.redirect('/');
            }
        }
    }

};

module.exports = AdminRouteMixin;
