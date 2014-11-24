'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');
var Select2Mixin = require('./Select2Mixin');

var Select2TagInput = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <input type="text" />
        );
        /*jshint ignore:end */
    },

    getSelect2Options: function () {
        return {locked: this.props.locked, tags: [], tokenSeparators: [',', ' ']};
    }
});

module.exports = Select2TagInput;
