'use strict';

var ValidatedFormMixin = {
    getFormComponentProps: function (property) {
        var messages = this.props.messages || {};
        var errPath = (this.props.path || []).concat(property).join('.');
        var msgPath = errPath.replace(/\.\d\./, '.');

        return {
            setter: this.props.requestChange.bind(null, (this.props.path || []).concat(property)),
            value: this.props.value[property],
            label: messages['label.' + msgPath],
            description: messages['description.' + msgPath],
            'data-placeholder': messages['placeholder.' + msgPath],
            help: (messages)['help.' + msgPath],
            error: (this.props.errors || {})[errPath],
            warning: (this.props.warnings || {})[errPath],
            forceError: this.props.forceError,
            id: 'inputElement' + '.' + errPath
        };
    },

    getSubFormProps: function (property) {
        return Object.assign(this.getFormComponentProps(property), {
            errors: this.props.errors,
            messages: this.props.messages,
            warnings: this.props.warnings,
            requestChange: this.props.requestChange,
            path: (this.props.path || []).concat(property)
        });
    }
};

module.exports = ValidatedFormMixin;