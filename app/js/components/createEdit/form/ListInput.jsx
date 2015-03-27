'use strict';

var React = require('react');
var { classSet } = React.addons;
var _ = require('../../../utils/_');

var ListInput = React.createClass({
    render: function () {
        var items = this.props.value || [];

        var itemForms = items.map(function (item, index) {
            var formProps = _.pick(this.props, ['requestChange', 'messages', 'errors',
                        'warnings', 'forceError', 'imageErrors']),
                imageErrors = (this.props.imageErrors ? this.props.imageErrors[index] : null) ||
                    {},
                props = Object.assign(formProps, {
                    value: item,
                    imageErrors: imageErrors,
                    removeHandler: this.onDelete.bind(null, index),
                    key: index,
                    path: this.props.path.concat(index)
                });

            return <this.props.itemForm {...props} />;
        }, this);

        var labelClasses = classSet({'input-optional': this.props.optional});

        return (
            <div id={this.props.id}>
                <div className={this.getClasses()}>
                    <label className={labelClasses}>{this.props.label}</label>
                    <p className="small">{this.props.description}</p>
                    <p className="help-block small">{this.props.help}</p>
                </div>
                <div>
                    {itemForms}
                </div>
                <button className="btn btn-sm btn-primary" onClick={this.handleNew}><i className="icon-plus-14-white"></i> Add New</button>
            </div>
        );
    },

    onDelete: function (key, event) {
        event.preventDefault();
        var items = this.props.value;
        items.splice(key, 1);
        this.props.setter(items);
    },

    getClasses: function () {
        return classSet({
            'form-group': true,
            'has-error': this.showError()
        });
    },

    showError: function () {
        return this.props.error && this.props.forceError;
    },

    handleNew: function (event) {
        event.preventDefault();
        var items = this.props.value || [];
        items.push({});
        this.props.setter(items);
    }
});

module.exports = ListInput;
