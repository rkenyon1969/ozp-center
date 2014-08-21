/** @jsx React.DOM */
'use strict';

var React  = require('react'),
    Chosen = require('drmonty-chosen');

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

var Dropdown = React.createClass({

    /*jshint ignore:start */
    render: function () {
        var options = this.props.options.map(function (option) {
            return <option value={option}>{option}</option>;
        });

        return (
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                <select data-placeholder={this.props.placeholder} className="form-control" onChange={this.handleChange} value={this.value()} ref="select" multiple={this.props.multiple}>
                    {options}
                </select>
            </div>
        );
    },

    componentDidUpdate: function() {

    },

    componentDidMount: function() {
        var select = $(this.refs.select.getDOMNode());
        select.chosen();
    },

    renderLabel: function () {
        return <label>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },
    /*jshint ignore:end */

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.value)) {
            return {};
        }

        return {value: this.props.value};
    },

    handleChange: function (event) {
        if (isWrappedValue(this.props.value)) {
            this.props.value.set(event.target.value);
        } else {
            this.setState({value: event.target.value});
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (!isWrappedValue(nextProps.value)) {
            this.setState({value: nextProps.value});
        }
    },

    value: function () {
        if (isWrappedValue(this.props.value)) {
            return this.props.value.val();
        } else {
            return this.state.value;
        }
    },
});



module.exports = Dropdown;
