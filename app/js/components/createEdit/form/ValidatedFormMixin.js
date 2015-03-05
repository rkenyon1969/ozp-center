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
            inputId: 'inputElement' + '.' + errPath
        };
    },

    getSubFormProps: function (property) {
        return Object.assign(this.getFormComponentProps(property), {
            errors: this.props.errors,
            imageErrors: this.props.imageErrors[property],
            messages: this.props.messages,
            warnings: this.props.warnings,
            requestChange: this.props.requestChange,
            path: (this.props.path || []).concat(property)
        });
    },

    getOptionsForSystemObject: function(items) {
        return items.map(item => {
            return { id: item.title, text: item.title };
        });
    }
};

module.exports = ValidatedFormMixin;
