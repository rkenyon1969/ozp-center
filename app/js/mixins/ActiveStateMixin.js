'use strict';

var _ = require('../utils/_');

var ActiveStateMixin = {

    mixins: [ require('react-router').State ],

    getActiveRoute: function () {
        return _.last(this.getRoutes());
    },

    getActiveRoutePath: function () {
        return _.last(this.getRoutes()).path;
    }

};

module.exports = ActiveStateMixin;
