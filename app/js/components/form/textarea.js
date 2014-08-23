/** @jsx React.DOM */
'use strict';

var React      = require('react'),
    InputMixin = require('./inputMixin');

module.exports = React.createClass({
    mixins: [InputMixin],

    /*jshint ignore:start */
    renderInputElement: function () {
        return this.transferPropsTo(<textarea className="form-control" onChange={this.handleChange} value={this.value()} />);
    },
    /*jshint ignore:end */
});
