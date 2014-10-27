'use strict';

var React = require('react');
var t = require('tcomb-form');
var { Str, struct, subtype } = t;
var Crud = require('../../shared/Crud');

// Category Schema
var Category = struct({
    title: subtype(Str, function (s) {
        return s.length <= 50;
    }),
    description: subtype(Str, function (s) {
        return s.length <= 255;
    })
});

var Categories = React.createClass({

    getDefaultProps: function() {
        return {
            title: 'Category',
            url: API_URL + '/api/category',
            Schema: Category,
            form: {
                fields: {
                    description: {
                        type: 'textarea'
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
