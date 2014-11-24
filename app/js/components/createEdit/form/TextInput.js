'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

var TextInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return <input type="text" />;
        /*jshint ignore:end */
    }
});

 module.exports = TextInput;
