'use strict';
var React = require('react');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var EnabledFilter = React.createClass({

    handleEnabledChange: function (evt) {
        var {value} = evt.target;
        if (value === 'null') { value = null; }
        if (value === 'true') { value = true; }
        if (value === 'false') { value = false; }
        this.props.onFilterChanged('enabled', value);
    },

    render: function () {
        var {counts, value} = this.props;
        value = _.isBoolean(this.props.value.enabled) ? this.props.value.enabled.toString() : 'null';

        var total = counts.total || 0;
        var enabled = counts.enabled || 0;
        var disabled = total - enabled;

        return (
            <div>
                <h4 style={{marginTop: 30}}>Enabled</h4>
                <RadioGroup
                    name="enabled"
                    value={ value }
                    onChange={ this.handleEnabledChange }>
                    <input id="all-listings-filter-enabled-all" type="radio" value="null"/>
                    <label htmlFor="all-listings-filter-enabled-all" className="label-all">
                        All
                        {
                            value === 'null' &&
                                <strong className="badge">{ total }</strong>
                        }
                    </label>
                    <input id="all-listings-filter-enabled-enabled" type="radio" value="true"/>
                    <label htmlFor="all-listings-filter-enabled-enabled" className="label-enabled">
                        Enabled
                        {
                            (value === 'null' || value === 'true') &&
                                <strong className="badge">{ enabled }</strong>
                        }
                    </label>
                    <input id="all-listings-filter-enabled-disabled" type="radio" value="false"/>
                    <label htmlFor="all-listings-filter-enabled-disabled" className="label-disabled">
                        Disabled
                        {
                            (value === 'null' || value === 'false') &&
                                <strong className="badge">{ disabled }</strong>
                        }
                    </label>
                </RadioGroup>
            </div>
        );
    }


});

module.exports = EnabledFilter;
