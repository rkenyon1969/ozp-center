'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

var FileInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return <input type="file" />;
        /*jshint ignore:end */
    },

    //override onChange so that it passes the file to the setter, not the fake
    //file path string that comes from the value property
    onChange: function(e) {
        e.preventDefault();
        this.props.setter(e.target.files[0]);
    }
});

module.exports = FileInput;
