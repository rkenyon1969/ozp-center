/** @jsx React.DOM */
'use strict';

var React = require('react');

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

var Select = React.createClass({

    /*jshint ignore:start */
    render: function () {
        return (
            <div className="form-group">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderSelect()}
            </div>
        );
    },

    renderLabel: function () {
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },

    renderSelect: function () {
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

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.value)) {
            return {};
        }

        return {value: this.props.value};
    },

    handleChange: function (event) {
        var value = event.target.value;

        if (isWrappedValue(this.props.value)) {
            this.props.value.set(value);
        } else {
            this.setState({value: value});
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



module.exports = Select;
