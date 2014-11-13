'use strict';

var ProfileStore = require('../stores/ProfileStore');

var AdminRouteMixin = {

    statics: {
        willTransitionTo: function (transition, component) {
            if (!ProfileStore.isAdmin()) {
                transition.abort();
                transition.redirect('/');
            }
        }
    }

};

module.exports = AdminRouteMixin;
