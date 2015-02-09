'use strict';

var React = require('react');
var InputMixin = require('./InputMixin.jsx');
var Select2Mixin = require('./Select2Mixin');

var Select2Input = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        return <input/>;
    },

    getSelect2Options: function () {
        return {data: this.props.options || [], multiple: !!this.props.multiple};
    }
});

module.exports = Select2Input;
