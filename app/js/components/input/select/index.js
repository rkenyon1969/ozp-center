/** @jsx React.DOM */
'use strict';

var React = require('react');

var Dropdown = React.createClass({
    getInitialState: function () {
        return {value: this.props.value};
    },

    handleChange: function (event) {
        var value = event.target.value;

        this.setState({value: value});
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({value: nextProps.value});
    },

    /*jshint ignore:start */
    render: function () {
        var options = this.props.data.map(function (option) {
            return <option value={option}>{option}</option>;
        });

        return (
            <select onChange={this.handleChange} value={this.state.value}>
                {options}
            </select>
        );
    }
    /*jshint ignore:end */
});



module.exports = Dropdown;
