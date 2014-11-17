'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, maybe } = t;
var { URL_REGEX } = require('../../../constants');
var Crud = require('../../shared/Crud');

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
    icon: maybe(subtype(Str, function (s) {
        return s.length <= 2083 && URL_REGEX.test(s);
    }))
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
                        icon: {
                            help: 'Max. 2083 characters'
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
                            return record.icon ? `<img style="width:24px;height:24px;" src=${record.icon} >` : '';
                        }
                    }
                ]
            }
        };
    },

    render: function () {
        /* jshint ignore:start */
        return this.transferPropsTo(<Crud />);
        /* jshint ignore:end */
    }

});

module.exports = Intents;
