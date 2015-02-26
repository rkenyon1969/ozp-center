'use strict';

var React = require('react');
var _ = require('../../../utils/_');
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
            separator: this.props.separator || "|",
            query: this.props.handleQuery,
            initSelection: this.props.handleQuery ? this.initSelection : undefined
        };
    },

    initSelection: function(el, callback) {
        //pass options objects that match list of values
        callback(_.filter(this.props.options, o => _.contains(this.props.value, o.id)));
    }
});

module.exports = Select2Input;
