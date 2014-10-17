'use strict';

var React         = require('react'),
    DataFormMixin = require('./dataFormMixin'),
    SelectMixin   = require('./selectMixin');

module.exports = React.createClass({
    mixins: [DataFormMixin, SelectMixin],

    getInitialState: function () {
        return {select2: {locked: this.props.locked}};
    },

    renderInput: function () {
        /*jshint ignore:start */
        return this.transferPropsTo(
            <select>
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
