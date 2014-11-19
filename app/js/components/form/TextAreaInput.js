'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

var TextAreaInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <textarea rows={this.props.rows || '3'} />
        );
        /*jshint ignore:end */
    },

    getValue: function (value) {
        //react textarea does not respond to a change from non-null to null
        return value || '';
    }
});

module.exports = TextAreaInput;
