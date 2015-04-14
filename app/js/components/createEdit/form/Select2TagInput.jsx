'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');
var Select2Mixin = require('./Select2Mixin');

var Select2TagInput = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        return (
            <input type="text" />
        );
    },

    getSelect2Options: function () {
        return {locked: this.props.locked, tags: [], tokenSeparators: [',', ';'], selectOnBlur: 'true'};
    }
});

module.exports = Select2TagInput;
