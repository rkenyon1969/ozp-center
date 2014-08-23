/** @jsx React.DOM */
'use strict';

var React      = require('react'),
    InputMixin = require('./inputMixin');

module.exports = React.createClass({
    mixins: [InputMixin],

    /*jshint ignore:start */
    renderInputElement: function () {
        var options = this.props.options.map(function (option) {
            return <option value={option.value}>{option.name}</option>;
        });

        options.unshift(<option value="" disabled>Choose an option</option>);

        return this.transferPropsTo(
            <select className="form-control" onChange={this.handleChange} value={this.value()} multiple={this.props.multiple}>
                {options}
            </select>
        );
    },
    /*jshint ignore:end */
});
