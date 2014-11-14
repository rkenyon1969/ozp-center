'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');
var Select2Mixin = require('./Select2Mixin');

var Select2Input = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <select data-placeholder={this.props['data-placeholder']} multiple={this.props.multiple}>
                {this.renderPlaceholder()}
                {this.props.children}
            </select>
        );
        /*jshint ignore:end */
    },

    renderPlaceholder: function () {
        if (this.props['data-placeholder'] && !this.props.multiple) {
            /*jshint ignore:start */
            return <option></option>;
            /*jshint ignore:end */
        }
    },

    getSelect2Options: function () {
        return {locked: this.props.locked};
    }
});

module.exports = Select2Input;
