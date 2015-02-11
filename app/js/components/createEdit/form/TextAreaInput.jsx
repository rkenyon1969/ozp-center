'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');

var TextAreaInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        return (
            <textarea rows={this.props.rows || '3'} />
        );
    }

});

module.exports = TextAreaInput;
