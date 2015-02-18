'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');
var Select2Mixin = require('./Select2Mixin');

var Select2Input = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        return <input type="text" />;
    },

    getSelect2Options: function () {
        return {
            data: this.props.options || [],
            multiple: !!this.props.multiple,
            query: this.props.handleQuery,
            initSelection: this.props.handleQuery ? this.initSelection : undefined
        };
    },

    initSelection: function(el, callback) {
        this.props.handleQuery({
            callback: function(selection) {
                callback(selection.results);
            }
        });
    }
});

module.exports = Select2Input;
