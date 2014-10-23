'use strict';

var React = require('react');
var InputMixin = require('./InputMixin');
var Select2Mixin = require('./Select2Mixin');

var Select2Input = React.createClass({
    mixins: [InputMixin, Select2Mixin],

    getInitialState: function () {
        return {select2: {locked: this.props.locked}};
    },

    renderInput: function () {
        /*jshint ignore:start */
        return (
            <select data-placeholder={this.props['data-placeholder']} multiple={this.props.multiple} 
                    required={this.props.required} defaultValue={this.props.defaultValue}>
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
    }
});

module.exports = Select2Input;
