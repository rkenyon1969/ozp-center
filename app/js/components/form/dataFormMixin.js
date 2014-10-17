'use strict';

var React      = require('react'),
    classSet   = React.addons.classSet,
    clone      = React.addons.cloneWithProps;

module.exports = {
    render: function () {
        var input = clone(this.renderInput(), {
            ref: 'input',
            onBlur: this.props.onBlur ? this.props.onBlur : this.handleBlur,
            onChange: this.props.onChange ? this.props.onChange : this.handleChange,
            defaultValue: this.props.dataBinder(),
            className: 'form-control'
        });

        /*jshint ignore:start */
        return (
            <div className={this.getClasses()}>
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderErrorMsg()}
                {input}
            </div>
        );
        /*jshint ignore:end */
    },

    renderLabel: function () {
        /*jshint ignore:start */
        return <label htmlFor={this.props.id}>{this.props.label}</label>;
        /*jshint ignore:end */
    },

    renderErrorMsg: function () {
        var errorMsg = this.props.error ? this.props.error : this.state.error;
        /*jshint ignore:start */
        return <span className="small validation-err-msg">{errorMsg}</span>;
        /*jshint ignore:end */
    },

    renderDescription: function () {
        /*jshint ignore:start */
        return <p className="small">{this.props.description}</p>;
        /*jshint ignore:end */
    },

    getClasses: function () {
        return classSet({
            'input-invalid': !!this.props.error || !!this.state.error,
            'form-group': true,
            'input-optional': !this.props.required
        });
    },

    getInitialState: function () {
        return {error: ''};
    },

    handleChange: function (event) {
        event.preventDefault();
        var inputNode = this.refs.input.getDOMNode();

        //check if change fixes any validation problems
        if (!this.props.error && this.state.error) {
            this.setState({
                valid: this.refs.input.getDOMNode().checkValidity(),
                error: this.refs.input.getDOMNode().validationMessage
            });
        }

        var value = this.getDOMValue(inputNode);
        this.props.dataBinder(value);
    },

    componentDidMount: function () {
        if (this.props.error) {
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

    handleBlur: function (event) {
        event.preventDefault();
        if (!this.props.error) {
            this.setState({error: this.refs.input.getDOMNode().validationMessage});
        }
    }
};
