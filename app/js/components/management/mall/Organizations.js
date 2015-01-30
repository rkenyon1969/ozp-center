'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype } = t;
var Crud = require('../../shared/Crud');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

// Organization Schema
var Organization = struct({
    title: subtype(Str, function (s) {
        return s.length <= 255;
    }),
    shortName: subtype(Str, function (s) {
        return s.length <= 8;
    })
});

var Categories = React.createClass({

    getDefaultProps: function () {
        return {
            title: 'Organization',
            url: API_URL + '/api/agency',
            Schema: Organization,
            getDisplayName: function (selectedRecord) {
                return selectedRecord.title;
            },
            form: {
                fields: {
                    title: {
                        help: 'Max. 255 characters'
                    },
                    shortName: {
                        label: 'Acronym or Abbreviation',
                        help: 'Max. 8 characters'
                    }
                }
            },
            grid: {
                columns: [
                    { field: 'title', caption: 'Title', size: '50%' },
                    { field: 'shortName', caption: 'Acronym', size: '50%' }
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

module.exports = Categories;
