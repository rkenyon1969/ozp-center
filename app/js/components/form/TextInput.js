'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

 var TextInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <input type="text" pattern={this.props.pattern} defaultValue={this.props.defaultValue}
                maxSize={this.props.maxSize} required={this.props.required} />
        );
        /*jshint ignore:end */
    }
});

 module.exports = TextInput;
