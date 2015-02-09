'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');

var TextAreaInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        return (
            <textarea rows={this.props.rows || '3'} />
        );
    },

    getValue: function (value) {
        //react textarea does not respond to a change from non-null to null
        return value || '';
    }
});

module.exports = TextAreaInput;
