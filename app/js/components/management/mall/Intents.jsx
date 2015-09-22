'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, maybe } = t;
var Crud = require('../../shared/Crud.jsx');

var ImageApi = require('../../../webapi/Image').ImageApi;
var ImageInput = require('../../createEdit/form/ImageInput.jsx');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

var $ = require('jquery');


/**
 * Custom tcomb input factory for image file inputs
 */
function iconFileInputFactory(initialImageUri, imageError, existingImageId, type, opts) {
    return React.createClass({
        getInitialState: function() {
            return {
                imageUri: initialImageUri,
                value: existingImageId,
                imageError: imageError
            };
        },

        onChange: function(value) {
            var existingImageUri = this.state.imageUri,
                newImageUri = window.URL && window.Blob && value instanceof Blob ?
                    URL.createObjectURL(value) : null;

            if (existingImageUri && window.URL && existingImageUri.indexOf('blob:') === 0) {
                URL.revokeObjectURL(existingImageUri);
            }

            this.setState({imageUri: newImageUri, value: value, imageError: null});
        },

        getValue: function() {
            return this.state.value;
        },

        getImageUri: function() {
            return this.state.imageUri;
        },

        componentDidUpdate: function() {
            if (opts.onChange) {
                opts.onChange(this);
            }
        },

        shouldComponentUpdate: function(newProps, newState) {
            return this.state.imageUri !== newState.imageUri;
        },

        render: function() {
            return (
                <div className="form-group">
                    <label>
                        <span>Icon<small className="text-muted"> (optional)</small></span>
                    </label>
                    <ImageInput
                        imageUri={this.state.imageUri} value={this.state.value}
                        setter={this.onChange} serverError={this.state.imageError} />
                </div>
            );
        }
    });
}

var iconInputFileType = window.Blob ?
    t.irriducible('Blob', x => x instanceof Blob) :
    t.irriducible('HTMLInputElement', x => x instanceof HTMLInputElement);

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
    iconInput: maybe(t.union([Str, iconInputFileType]))
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
            grid: {
                columns: [
                    { field: 'label', caption: 'Label', size: '10%' },
                    { field: 'action', caption: 'Action', size: '45%' },
                    { field: 'type', caption: 'Type', size: '45%' },
                    { field: 'icon', caption: 'Icon', size: '50px',
                        render: function (record) {
                            return record.icon ?
                                `<img style="width:24px;height:24px;" alt='record icon' src=${record.icon} >` :
                                '';
                        }
                    }
                ]
            }
        };
    },

    getInitialState: function() {
        return {imageError: null, imageUri: undefined};
    },

    getForm: function (selectedRecord) {
        var me = this;

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
                    input: function(type, opts) {
                        var imageUri = me.state.imageUri ||
                                (selectedRecord ? selectedRecord.icon : undefined),
                            existingImageId =
                                (selectedRecord ? selectedRecord.iconId : undefined),
                            imageError = me.state.imageError,
                            oldChangeHandler = opts.onChange;

                        //listen for change a remember imageUri
                        opts.onChange = function(input) {
                            me.state.imageUri = input.getImageUri();

                            oldChangeHandler.apply(null, arguments);
                        };

                        return iconFileInputFactory(imageUri, imageError, existingImageId,
                                type, opts);
                    }
                }
            }
        };
    },

    save: function(data, intentSaveFunction) {
        var me = this,
            inputVal = data.iconInput,

            //inputVal could be a string (the existing image id) or a File/Input to save,
            //or null (if the image was removed)
            iconSave = (inputVal && typeof inputVal !== 'string') ?
                this.saveIcon(data.iconInput) :
                $.Deferred().resolve(inputVal).promise();

        iconSave.then(function(iconId) {
            me.setState({imageError: null});

            intentSaveFunction(Object.assign({}, data, {
                iconId: iconId,
                iconInput: undefined
            }));
        });
    },

    saveIcon: function(icon) {
        return ImageApi.save(icon).then((json => json.id), this.handleImageSaveFailure);
    },

    handleImageSaveFailure: function(response, err, statusText) {
        var json = response.responseJSON,
            jsonMessage = json ? json.message : null,
            errorMessage = jsonMessage || statusText ||
                'Unknown error saving image';

        this.setState({imageError: errorMessage});
    },

    onCreate: function(data) {
        this.save(data, this.refs.crud._onCreate);
    },

    onEdit: function(data) {
        this.save(data, this.refs.crud._onEdit);
    },

    resetState: function() {
        this.setState(this.getInitialState());
    },

    render: function () {
        return this.transferPropsTo(<Crud ref="crud" onCreate={this.onCreate}
                onEdit={this.onEdit} onResetState={this.resetState} form={this.getForm} />);
    }

});

module.exports = Intents;
