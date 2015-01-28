'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var EnabledFilter = React.createClass({

    handleEnabledChange: function (evt) {
        var {value} = evt.target;
        if(value === 'null') { value = null; }
        if(value === 'true') { value = true; }
        if(value === 'false') { value = false; }
        this.props.onFilterChanged('enabled', value);
    },

    render: function() {
        var counts = this.props.counts;

        return (
            /*jshint ignore:start */
            <div>
            <h4 style={{marginTop: 30}}>Enabled</h4>
            <RadioGroup name="enabled"
                value={ (this.props.value.enabled === undefined) ? 'null' : this.props.value.enabled.toString() }
                onChange={ this.handleEnabledChange }>
                <input id="all-listings-filter-enabled-all" type="radio" value="null"/>
                <label htmlFor="all-listings-filter-enabled-all" className="label-all">
                    All
                    <strong className="badge">{ counts.total }</strong>
                </label>
                <input id="all-listings-filter-enabled-enabled" type="radio" value="true"/>
                <label htmlFor="all-listings-filter-enabled-enabled" className="label-enabled">
                    Enabled
                    <strong className="badge">{ counts.enabled }</strong>
                </label>
                <input id="all-listings-filter-enabled-disabled" type="radio" value="false"/>
                <label htmlFor="all-listings-filter-enabled-disabled" className="label-disabled">
                    Disabled
                    <strong className="badge">{ counts.disabled || 0 }</strong>
                </label>
            </RadioGroup>
            </div>
            /*jshint ignore:end */
        );
    }


});

module.exports = EnabledFilter;
