'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, maybe } = t;
var { URL_REGEX } = require('../../../constants');
var Crud = require('../../shared/Crud');

var ImageApi = require('../../../webapi/Image').ImageApi;
var ImageInput = require('../../createEdit/form/ImageInput');

function iconFileInputFactory(initialImageUri, type, opts) {
    var label = opts.label;

    return React.createClass({
        getInitialState: function() {
            return {
                imageUri: initialImageUri,
                value: null
            };
        },

        onChange: function(value) {
            var existingImageUri = this.state.imageUri,
                newImageUri = window.URL && window.Blob && value instanceof Blob ?
                    URL.createObjectURL(value) : null;

            if (existingImageUri && window.URL && existingImageUri.indexOf('blob:') === 0) {
                URL.revokeObjectURL(existingImageUri);
            }

            this.setState({imageUri: newImageUri, value: value});
        },

        getValue: function() {
            //create simple ValidationResult object without checking any validation.
            //No validation can be done since tcomb has no support for File objects.
            return this.state.value;
        },

        render: function() {
            /* jshint ignore:start */
            return (
                <div className="form-group">
                    <label>
                        {label}
                    </label>
                    <ImageInput
                        imageUri={this.state.imageUri} value={this.state.imageUri}
                        setter={this.onChange} error={this.props.errors} />
                </div>
            );
            /* jshint ignore:end */
        }
    });
}

// Intent Schema
var Intent = struct({
    label: maybe(subtype(Str, function (s) {
        return s.length <= 255;
    })),
    action: subtype(Str, function (s) {
        return s.length <= 64;
    }),
    type: subtype(Str, function (s) {
        return s.length <= 129;
    }),
    iconInput: window.Blob ?
        t.irriducible('Blob', x => x instanceof Blob) :
        t.irriducible('HTMLInputElement', x => x instanceof HTMLInputElement)
});

var Intents = React.createClass({

    getDefaultProps: function () {
        return {
            title: 'Intent',
            url: API_URL + '/api/intent',
            Schema: Intent,
            getDisplayName: function (selectedRecord) {
                return `${selectedRecord.action}/${selectedRecord.type}`;
            },
            form: function (selectedRecord) {
                return {
                    fields: {
                        label: {
                            help: 'Max. 255 characters'
                        },
                        action: {
                            help: 'Max. 64 characters',
                            disabled: selectedRecord ? true : false
                        },
                        type: {
                            disabled: selectedRecord ? true : false,
                            help: 'Max. 64 characters/Max. 64 characters. Ex: application/json, application/custom-type, etc.'
                        },
                        iconInput: {
                            //partially apply to get proper factory function
                            input: iconFileInputFactory.bind(null,
                                selectedRecord ? selectedRecord.icon : undefined)
                        }
                    }
                };
            },
            grid: {
                columns: [
                    { field: 'label', caption: 'Label', size: '10%' },
                    { field: 'action', caption: 'Action', size: '45%' },
                    { field: 'type', caption: 'Type', size: '45%' },
                    { field: 'icon', caption: 'Icon', size: '50px',
                        render: function (record) {
                            return record.icon ?
                                `<img style="width:24px;height:24px;" src=${record.icon} >` :
                                '';
                        }
                    }
                ]
            }
        };
    },

    save: function(data, intentSaveFunction) {
        this.saveIcon(data.iconInput).then(function(iconId) {
            intentSaveFunction(Object.assign({}, data, {
                iconId: iconId,
                icon: undefined,
                iconInput: undefined
            }));
        });
    },

    saveIcon: function(icon) {
        return ImageApi.save(icon).then(json => json.id);
    },

    onCreate: function(data, crud) {
        this.save(data, crud._onCreate);
    },

    onEdit: function(data, crud) {
        this.save(data, crud._onEdit);
    },

    render: function () {
        /* jshint ignore:start */
        return this.transferPropsTo(<Crud onCreate={this.onCreate}
                onEdit={this.onEdit}/>);
        /* jshint ignore:end */
    }

});

module.exports = Intents;
