'use strict';

var React         = require('react'),
    DataFormMixin = require('./dataFormMixin'),
    SelectMixin   = require('./selectMixin');

module.exports = React.createClass({
    mixins: [DataFormMixin, SelectMixin],

    getInitialState: function () {
        return {select2: {locked: this.props.locked, tags: [], tokenSeparators: [',', ' ']}};
    },

    renderInput: function () {
        /*jshint ignore:start */
        return this.transferPropsTo(
            <input type="text" />
        );
        /*jshint ignore:end */
    }
});
