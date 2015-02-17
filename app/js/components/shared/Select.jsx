'use strict';

var React = require('react');
var _ = require('../../utils/_');

var Select = React.createClass({

    propTypes: {
        options: React.PropTypes.array.isRequired
    },

    _renderOptions() {
        return this.props.options.map(function (value) {
            return <option key={value} value={value}>{value}</option>;
        });
    },

    render: function () {
        var props = _.omit(this.props, 'options');

        return (
            <select {...props}>
                { this._renderOptions() }
            </select>
        );
    }

});

module.exports = Select;
