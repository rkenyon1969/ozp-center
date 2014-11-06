'use strict';

var React = require('react');
var clone = React.addons.cloneWithProps;
var classSet = React.addons.classSet;

module.exports = {
    getInitialState: function () {
        return {error: ''};
    },

    getDefaultProps: function () {
        return {error: ''};
    },

    render: function () {
        var extraProps = {
            ref: 'input',
            className: 'form-control'
        };

        //allow override of default change and blur handlers
        if(!this.props.onChange) {
            extraProps.onChange = this.handleChange;
        }
        if(!this.props.onBlur) {
            extraProps.onBlur = this.handleBlur;
        }

        var input = clone(this.renderInput(), extraProps);

        /*jshint ignore:start */
        return (
            <div className={this.getClasses()}>
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.hasError() && this.renderErrorMsg()}
                {input}
            </div>
        );
        /*jshint ignore:end */
    },

    getClasses: function () {
        return classSet({
            'input-invalid': this.hasError(),
            'form-group': true,
            'input-optional': !this.props.required
        });
    },

    renderLabel: function () {
        /*jshint ignore:start */
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
        /*jshint ignore:end */
    },

    renderDescription: function () {
        /*jshint ignore:start */
        return <p className="small">{this.props.description}</p>;
        /*jshint ignore:end */
    },

    renderErrorMsg: function () {
        /*jshint ignore:start */
        return (
            <span className="small validation-err-msg">
                {this.state.error}
            </span>
        );
        /*jshint ignore:end */
    },

    componentDidMount: function () {
        this.setErrorOnDOM();
    },

    componentDidUpdate: function () {
        this.setErrorOnDOM();
    },

    _getDOMValue: function () {
        return this.getDOMValue ? this.getDOMValue() : this.refs.input.getDOMNode().value;
    },

    hasError: function () {
        return !!this.props.error || !!this.state.error;
    },

    handleChange: function (event) {
        event.preventDefault();

        //check if change fixes any existing error state
        if (this.state.error) {
            this.setErrorState();
        }

        this.props.setter(this._getDOMValue());
    },

    setErrorOnDOM: function () {
        if(this.props.error) {
            this.refs.input.getDOMNode().setCustomValidity(this.props.error);
        } else {
            this.refs.input.getDOMNode().setCustomValidity('');
        }
    },

    setErrorState: function () {
        //If error is set via props, there is no need to update state
        if(!this.props.error) {
            var inputNode = this.refs.input.getDOMNode();

            var err = inputNode.validationMessage;
            var patternErr = inputNode.validity.patternMismatch;
            var patternMsg = this.props.validationMessage;

            this.setState({
                error: patternErr && patternMsg ? patternMsg : err
            });
        }
    },

    handleBlur: function (event) {
        event.preventDefault();
        this.setErrorState();
    }
};
