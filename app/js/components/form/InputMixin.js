'use strict';

var React = require('react');
var clone = React.addons.cloneWithProps;
var classSet = React.addons.classSet;

module.exports = {
    getInitialState: function () {
        return {blurred: false};
    },

    render: function () {
        var inputProps = {
            ref: 'input',
            className: 'form-control',
            id: this.props.id,
            valueLink: this.props.valueLink,
            onBlur: this.onBlur,
            rows: this.props.rows
        };

        var input = clone(this.renderInput(), inputProps);
        var labelClasses = classSet({'input-optional': this.props.optional});

        /*jshint ignore:start */
        return (
            <div className={this.getClasses()}>
                <label htmlFor={this.props.id} className={labelClasses}>{this.props.label}</label>
                <p className="small">{this.props.description}</p>
                {input}
                <p className="help-block small">{this.props.help}</p>
            </div>
        );
        /*jshint ignore:end */
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

    onBlur: function (event) {
        event.preventDefault();
        this.setState({blurred: true});
    }
};
