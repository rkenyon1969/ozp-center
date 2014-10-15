/** @jsx React.DOM */
'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');
var Select2Mixin = require('./Select2Mixin');

var Select2TagInput = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    getInitialState: function () {
        return {select2: {locked: this.props.locked, tags: [], tokenSeparators: [',', ' ']}};
    },

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <input type="text" />
        );
        /*jshint ignore:end */
    }
});

module.exports = Select2TagInput;