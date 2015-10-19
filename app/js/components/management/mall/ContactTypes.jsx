'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, Bool } = t;
var Crud = require('../../shared/Crud.jsx');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

// ContactType Schema
var ContactType = struct({
    name: subtype(Str, function (s) {
        return s.length <= 50;
    }),
    required: Bool
});

var ContactTypes = React.createClass({

    getDefaultProps: function () {
        return {
            title: 'Contact Type',
            url: API_URL + '/api/contact_type',
            Schema: ContactType,
            getDisplayName: function (selectedRecord) {
                return selectedRecord.name;
            },
            form: {
                fields: {
                    name: {
                        help: 'Max. 50 characters'
                    }
                }
            },
            grid: {
                columns: [
                    { field: 'name', caption: 'Name', size: '50%' },
                    { field: 'required', caption: 'Required', size: '50%' }
                ]
            }
        };
    },

    render: function () {
        return this.transferPropsTo(<Crud />);
    }

});

module.exports = ContactTypes;
