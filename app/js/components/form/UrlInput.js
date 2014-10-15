/** @jsx React.DOM */
'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

 var UrlInput = React.createClass({
    mixins: [InputMixin],

    getDefaultProps: function () {
    	return {
            maxSize: 2083,
            validationMessage: 'Please enter a valid URL'
        };
    },

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <input type="url" pattern={this.props.pattern} defaultValue={this.props.defaultValue}
                maxSize={this.props.maxSize} required={this.props.required} />
        );
        /*jshint ignore:end */
    }
});

 module.exports = UrlInput;