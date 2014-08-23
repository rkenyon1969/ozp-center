/** @jsx React.DOM */
'use strict';

var React = require('react');

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

module.exports = {

    /*jshint ignore:start */
    render: function () {
        return (
            <div className="form-group">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderInputElement()}
            </div>
        );
    },

    renderLabel: function () {
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },
    /*jshint ignore:end */

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.itemValue)) {
            return {};
        }

        return {value: this.props.itemValue};
    },

    handleChange: function (event) {
        var value = event.target.value;

        if (isWrappedValue(this.props.itemValue)) {
            this.props.itemValue.set(value);
        } else {
            this.setState({value: value});
        }

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (!isWrappedValue(nextProps.itemValue)) {
            this.setState({value: nextProps.itemValue});
        }
    },

    value: function () {
        if (isWrappedValue(this.props.itemValue)) {
            return this.props.itemValue.val();
        } else {
            return this.state.value;
        }
    },
};
