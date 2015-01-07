'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');

var FileInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function () {
        /*jshint ignore:start */
        return <input type="file" />;
        /*jshint ignore:end */
    }
});

module.exports = FileInput;
