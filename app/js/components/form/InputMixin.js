'use strict';

var React = require('react');
var clone = React.addons.cloneWithProps;
var classSet = React.addons.classSet;

var InputMixin = {
    getInitialState: function () {
        return {blurred: false};
    },

    render: function () {
        var labelClasses = classSet({'input-optional': this.props.optional});

        /*jshint ignore:start */
        return (
            <div className={this.getClasses()}>
                <label htmlFor={this.props.id} className={labelClasses}>{this.props.label}</label>
                <p className="small">{this.props.description}</p>
                {clone(this.renderInput(), this.getInputProps())}
                <p className="help-block small">{this.props.help}</p>
            </div>
        );
        /*jshint ignore:end */
    },

    shouldComponentUpdate: function (newProps, newState) {
        if (newProps.description !== this.props.description) {
            return true;
        }

        if (newProps.value !== this.props.value) {
            return true;
        }

        if (newProps.label !== this.props.label) {
            return true;
        }

        if (newState.blurred !== this.state.blurred) {
            return true;
        }

        if (newProps.error !== this.props.error) {
            return true;
        }

        if (newProps.id !== this.props.id) {
            return true;
        }

        return false;
    },

    getClasses: function () {
        return classSet({
            'form-group': true,
            'has-error': this.showError(),
            'has-warning': this.showWarning()
        });
    },

    showWarning: function () {
        return !this.showError() && (this.props.warning && this.state.blurred);
    },

    showError: function () {
        return this.props.error && (this.state.blurred || this.props.forceError);
    },

    _onBlur: function (event) {
        event.preventDefault();
        this.setState({blurred: true});
    },

    _onChange: function (event) {
        event.preventDefault();
        this.props.setter(event.target.value);
    },

    getInputProps: function () {
        var value = this.getValue ? this.getValue(this.props.value) : this.props.value;
        var onChange = this.onChange ? this.onChange : this._onChange;
        var onBlur = this.onBlur ? this.onBlur : this._onBlur;

        return {
            ref: 'input',
            className: 'form-control',
            id: this.props.id,
            value: value,
            onBlur: onBlur,
            onChange: onChange
        };
    }
};

module.exports = InputMixin;
