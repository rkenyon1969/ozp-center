'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, maybe, Bool } = t;
var Crud = require('../../shared/Crud');

// ContactType Schema
var ContactType = struct({
    title: subtype(Str, function (s) {
        return s.length <= 50;
    }),
    required: Bool
});

var ContactTypes = React.createClass({

    getDefaultProps: function() {
        return {
            title: 'Contact Type',
            url: API_URL + '/api/contactType',
            Schema: ContactType,
            getDisplayName: function (selectedRecord) {
                return selectedRecord.title;
            },
            grid: {
                columns: [
                    { field: 'title', caption: 'Title', size: '50%' },
                    { field: 'required', caption: 'Required', size: '50%' }
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

module.exports = ContactTypes;
