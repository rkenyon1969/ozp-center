'use strict';

module.exports = {
    getProps: function (property) {
        var messages = this.props.messages || {},
            item = this.props.item,
            errors = this.props.errors || {},
            warnings = this.props.warnings || {},
            path = (this.props.path || []).concat(property);

        var errPath = path.join('.');
        var msgPath = errPath.replace(/\.\d\./, '.');

        var valueLink = {
            value: item[property],
            requestChange: this.props.requestChange.bind(null, path)
        };

        return {
            valueLink: valueLink,
            label: messages['label.' + msgPath],
            description: messages['description.' + msgPath],
            'data-placeholder': messages['placeholder.' + msgPath],
            help: messages['help.' + msgPath],
            error: errors[errPath],
            warning: warnings[errPath],
            forceError: this.props.forceError
        };
    },

    getSubFormProps: function (property) {
        var formProps = {
            errors: this.props.errors || {},
            messages: this.props.messages || {},
            warnings: this.props.warnings || {},
            system: this.props.system || {},
            requestChange: this.props.requestChange,
            path: [property]
        };

        return Object.assign(this.getProps(property), formProps);
    }
};

    