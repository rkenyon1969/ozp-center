/** @jsx React.DOM */
'use strict';

var React    = require('react'),
    classSet = React.addons.classSet,
    clone    = React.addons.cloneWithProps;

function isWrappedValue (value) {
    return value && typeof value.val === 'function';
}

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            elementType: 'input',
            options: []
        };
    },

    /*jshint ignore:start */
    render: function () {
        return (
            <div className={this.getClasses()}>
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderErrorMsg()}
                {this.renderInputElement()}
            </div>
        );
    },

    renderLabel: function () {
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
    },

    renderErrorMsg: function () {
        return <span className="small validation-err-msg">{this.getError()}</span>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },

    renderInputElement: function () {
        var props = {
            className: 'form-control',
            onChange: this.handleChange,
            value: this.value(),
            onBlur: this.handleBlur,
            ref: 'input'
        };

        var inputElement;

        switch (this.props.elementType) {
            case 'input':
                inputElement = clone(<input />, props);
                break;
            case 'textarea':
                inputElement = clone(<textarea />, props);
                break;
            case 'select':
                inputElement = clone(this.renderSelect(), props);
                break;
            default:
                inputElement = clone(<input />, props);
        }

        return this.transferPropsTo(inputElement);
    },

    renderSelect: function () {
        var options = this.props.options.map(function (option) {
            return <option value={option.value}>{option.name}</option>;
        });

        options.unshift(<option value="" disabled>Choose an option</option>);

        return this.transferPropsTo(
            <select>
                {options}
            </select>
        );
    },
    /*jshint ignore:end */

    getClasses: function () {
        return classSet({
            'input-invalid': !this.isValid(),
            'form-group': true
        });
    },

    getInitialState: function () {
        var state = {
            valid: true,
            error: ''
        };

        if (isWrappedValue(this.props.itemValue)) {
            return state;
        }

        state.value = this.props.itemValue;
        return state;
    },

    handleChange: function (event) {
        var inputNode = this.refs.input.getDOMNode(),
            state = {};

        //check if change fixes any validation problems
        if (!this.state.valid) {
            state.valid = this.refs.input.getDOMNode().checkValidity();
            state.error = this.refs.input.getDOMNode().validationMessage;
        }

        var value = inputNode.value;
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

    componentDidMount: function () {
        if(this.props.error) {
            this.refs.input.getDOMNode().setCustomValidity(this.props.error);
        }
    },

    componentDidUpdate: function () {
        var inputNode = this.refs.input.getDOMNode();
        if (this.props.error) {
            inputNode.setCustomValidity(this.props.error);
        } else {
            inputNode.setCustomValidity('');
        }
    },

    value: function () {
        if (isWrappedValue(this.props.itemValue)) {
            return this.props.itemValue.val();
        } else {
            return this.state.value;
        }
    },

    isValid: function () {
        return this.props.error ? !this.props.error : this.state.valid;
    },

    getError: function () {
        return this.props.error ? this.props.error : this.state.error;
    },

    handleBlur: function () {
        this.setState({
            valid: this.refs.input.getDOMNode().checkValidity(),
            error: this.refs.input.getDOMNode().validationMessage
        });
    }
});
