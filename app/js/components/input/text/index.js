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
        return this.transferPropsTo(
            <div className="create-edit-input-element">
                {this.props.label && this.renderLabel()}
                {this.props.description && this.renderDescription()}
                {this.renderInput()}
            </div>
        );
    },

    renderLabel: function () {
        return <label>{this.props.label}</label>;
    },

    renderDescription: function () {
        return <p className="small">{this.props.description}</p>;
    },

    renderInput: function () {
        var props = {
            onChange: this.handleChange,
            className: "form-control",
            value: this.value()
        };

        var textArea = <textarea></textarea>;
        var text = <input type="text" />;
        switch (this.props.type) {
            case 'textarea':
                return clone(textArea, props);
            case 'text':
                return clone(text, props);
            default:
                return clone(text, props);
        }
    },
    /*jshint ignore:end */

    getInitialState: function () {
        //if this is a cortex wrapped value, then we don't need state
        if (isWrappedValue(this.props.value)) {
            return {};
        }

        return {value: this.props.value || ''};
    },

    componentWillReceiveProps: function (nextProps) {
        if (!isWrappedValue(nextProps.value)) {
            this.setState({value: nextProps.value});
        }
    },

    value: function () {
        if (isWrappedValue(this.props.value)) {
            return this.props.value.val();
        } else {
            return this.state.value;
        }
    },

    handleChange: function (event) {
        if (isWrappedValue(this.props.value)) {
            this.props.value.set(event.target.value);
        } else {
            this.setState({value: event.target.value});
        }
    }
});
