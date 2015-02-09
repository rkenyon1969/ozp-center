'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');

var TextInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        return <input type="text" />;
    }
});

 module.exports = TextInput;
