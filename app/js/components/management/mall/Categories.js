'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype, maybe } = t;
var Crud = require('../../shared/Crud');

var { API_URL } = require('ozp-react-commons/OzoneConfig');

// Category Schema
var Category = struct({
    title: subtype(Str, function (s) {
        return s.length <= 50;
    }),
    description: maybe(subtype(Str, function (s) {
        return s.length <= 255;
    }))
});

var Categories = React.createClass({

    getDefaultProps: function () {
        return {
            title: 'Category',
            url: API_URL + '/api/category',
            Schema: Category,
            getDisplayName: function (selectedRecord) {
                return selectedRecord.title;
            },
            form: {
                fields: {
                    title: {
                        help: 'Max. 50 characters'
                    },
                    description: {
                        type: 'textarea',
                        help: 'Max. 255 characters'
                    }
                }
            },
            grid: {
                columns: [
                    { field: 'title', caption: 'Title', size: '50%' },
                    { field: 'description', caption: 'Description', size: '50%' }
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
