'use strict';

var React = require('react');
var { cloneWithProps, classSet } = React.addons;

var InputMixin = {
    getInitialState: function () {
        return {
            value: this.props.value,
            blurred: false
        };
    },

    render: function () {
        var labelClasses = classSet({ 'input-optional': this.props.optional });

        return (
            <div className={ this.getClasses() }>
                <label htmlFor={ this.props.id } className={labelClasses}>{ this.props.label }</label>
                <p className="small">{ this.props.description }</p>
                { this.props.help && <p className="help-block small">{ this.props.help }</p>}
                { cloneWithProps(this.renderInput(), this.getInputProps()) }
            </div>
        );
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.id !== this.props.id) {
            return true;
        }

        if (nextProps.value !== nextState.value) {
            return true;
        }

        if (nextProps.description !== this.props.description) {
            return true;
        }

        if (nextProps.label !== this.props.label) {
            return true;
        }

        if (nextProps.help !== this.props.help) {
            return true;
        }

        if (nextProps.optional !== this.props.optional) {
            return true;
        }

        if (nextState.blurred !== this.state.blurred) {
            return true;
        }

        if (this.showWarning(nextProps, nextState) !==
                this.showWarning(this.props, this.state)) {
            return true;
        }

        if (this.showError(nextProps, nextState) !==
                this.showError(this.props, this.state)) {
            return true;
        }

        return false;
    },

    getClasses: function () {
        return classSet({
            'form-group': true,
            'has-error': this.showError(this.props, this.state),
            'has-warning': this.showWarning(this.props, this.state)
        });
    },

    //we pass props and state into showError/showWarning so that they
    //can be used in shouldComponentUpdate
    showWarning: function (props, state) {
        return !this.showError(props, state.blurred) && (props.warning && state.blurred);
    },

    showError: function (props, state) {
        return props.error && (state || props.forceError);
    },

    _onBlur: function (event) {
        event.preventDefault();
        this.setState({blurred: true});
    },

    _onChange: function (event) {
        event.preventDefault();
        var { value } = event.target;
        this.setState({ value: value });
        this.props.setter(value);
    },

    getInputProps: function () {
        var value = this.getValue ? this.getValue(this.props.value) : (this.state.value || this.props.value);
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
