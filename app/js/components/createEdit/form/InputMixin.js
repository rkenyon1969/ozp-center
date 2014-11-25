'use strict';

var React = require('react');
var { cloneWithProps, classSet } = React.addons;

var InputMixin = {
    getInitialState: function () {
        return {blurred: false};
    },

    render: function () {
        var labelClasses = classSet({ 'input-optional': this.props.optional });

        /*jshint ignore:start */
        return (
            <div className={ this.getClasses() }>
                <label htmlFor={ this.props.id } className={labelClasses}>{ this.props.label }</label>
                <p className="small">{ this.props.description }</p>
                { cloneWithProps(this.renderInput(), this.getInputProps()) }
                { this.props.help && <p className="help-block small">{ this.props.help }</p>}
            </div>
        );
        /*jshint ignore:end */
    },

    shouldComponentUpdate: function (newProps, newState) {
        if (newProps.description !== this.props.description) {
            return true;
        }

        if (newProps.label !== this.props.label) {
            return true;
        }

        if (newProps.help !== this.props.help) {
            return true;
        }

        if (newProps.optional !== this.props.optional) {
            return true;
        }

        if (newProps.value !== this.props.value) {
            return true;
        }

        if (newState.blurred !== this.state.blurred) {
            return true;
        }

        if (this.showWarning(newProps, newState.blurred) !== 
                this.showWarning(this.props, this.state.blurred)) {
            return true;
        }

        if (this.showError(newProps, newState.blurred) !== 
                this.showError(this.props, this.state.blurred)) {
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
            'has-error': this.showError(this.props, this.state.blurred),
            'has-warning': this.showWarning(this.props, this.state.blurred)
        });
    },

    //we pass props and state into showError/showWarning so that they
    //can be used in shouldComponentUpdate
    showWarning: function (props, blurred) {
        return !this.showError(props, blurred) && (props.warning && blurred);
    },

    showError: function (props, blurred) {
        return props.error && (blurred || props.forceError);
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
