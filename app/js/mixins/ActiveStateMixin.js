'use strict';

var _ = require('../utils/_');

var ActiveStateMixin = {

    mixins: [ require('react-router').ActiveState ],

    getActiveRoute: function () {
        return _.last(this.getActiveRoutes());
    },

    getActiveRoutePath: function () {
        return _.last(this.getActiveRoutes()).props.name;
    }

};

module.exports = ActiveStateMixin;
