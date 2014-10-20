'use strict';

var React         = require('react'),
    DataFormMixin = require('./dataFormMixin');

module.exports = React.createClass({
    mixins: [DataFormMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return this.transferPropsTo(
            <textarea />
        );
        /*jshint ignore:end */
    },

    getDOMValue: function (target) {
        return target.value;
    }
});
