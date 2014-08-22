/** @jsx React.DOM */
'use strict';

var React = require('react/addons'),
    clone = React.addons.cloneWithProps;

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

module.exports = React.createClass({
    /*jshint ignore:start */
    render: function () {
        return (
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderInput()}
            </div>
        );
    },

    renderLabel: function () {
        var idFor = this.props.id ? this.props.id : null;
        return <label htmlFor={idFor}>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p>{this.props.description}</p>;
    },

    renderInput: function () {
        return this.transferPropsTo(<input className="form-control" onChange={this.handleChange} value={this.value()} />);
    },
    /*jshint ignore:end */

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.itemValue)) {
            return {};
        }

        return {value: this.props.itemValue || ''};
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
            return this.state.itemValue;
        }
    },

    handleChange: function (event) {
        if (isWrappedValue(this.props.itemValue)) {
            this.props.itemValue.set(event.target.value);
        } else {
            this.setState({value: event.target.value});
        }

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }
});
