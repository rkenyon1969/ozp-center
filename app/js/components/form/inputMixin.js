/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    classSet = React.addons.classSet;

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

module.exports = {

    /*jshint ignore:start */
    render: function () {
        return (
            <div className={this.getClasses()}>
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.props.errorMessage && this.renderErrorMsg()}
                {this.renderInputElement()}
            </div>
        );
    },

    renderLabel: function () {
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
    },

    renderErrorMsg: function () {
        return <span className="small validation-err-msg">{this.props.errorMessage}</span>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },
    /*jshint ignore:end */

    getClasses: function () {
        return classSet({
            'input-invalid': !this.state.valid,
            'form-group': true
        });
    },

    getInitialState: function () {
        var state = {
            valid: true
        };

        if (isWrappedValue(this.props.itemValue)) {
            return state;
        }

        state.value = this.props.itemValue;
        return state;
    },

    handleChange: function (event) {
        var state = {};

        //check if change fixes any validation problems
        if (!this.state.valid) {
            state.valid = this.isValid(event.target);
        }

        var value = event.target.value;
        if (isWrappedValue(this.props.itemValue)) {
            this.props.itemValue.set(value);
        } else {
            state.value = value;
        }

        this.setState(state);

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

    isValid: function (element) {
        return element.checkValidity();
    },

    handleBlur: function (event) {
        this.setState({valid: this.isValid(event.target)});
    }
};
