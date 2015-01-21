'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var OrgFilter = React.createClass({

    handleChange: function (key, evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged(key, value);
    },

    render: function() {
        var counts = this.props.counts;

        var organizations = this.props.organizations.map(function (organization) {
                var count = (counts && counts.organizations) ? counts.organizations[organization.id] : 0;
                /* jshint ignore:start */
                return (
                    <div key={ organization.id }>
                        <input id={ "all-listings-filter-organization-" + organization.shortName.toLowerCase() } type="radio" value={ organization.title }/>
                        <label htmlFor={ "all-listings-filter-organization-" + organization.shortName.toLowerCase() } className="label-organization">
                            { organization.shortName }
                            <strong className="badge">{ count || 0 }</strong>
                        </label>
                    </div>
                );
                /* jshint ignore:end */
        });

        return (
            /* jshint ignore:start */
            <div>
                <h4 style={{marginTop: 30}}>Organization</h4>
                <RadioGroup name="organization"
                    value={ this.props.value['org'] || 'all' }
                    onChange={ _.partial(this.handleChange, "org") }>
                    <input id="all-listings-filter-organization-all" type="radio" value="all"/>
                    <label htmlFor="all-listings-filter-organization-all" className="label-all">
                        All
                        <strong className="badge">{ counts.total }</strong>
                    </label>
                    { organizations }
                </RadioGroup>
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = OrgFilter;
