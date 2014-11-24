'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');
var Select2Mixin = require('./Select2Mixin');

var Select2Input = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        /*jshint ignore:start */
        return <input/>;
        /*jshint ignore:end */
    },

    getSelect2Options: function () {
        return {data: this.props.options || [], multiple: !!this.props.multiple};
    }
});

module.exports = Select2Input;
