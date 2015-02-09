'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var OrgFilter = React.createClass({

    handleChange: function (evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged('org', value);
    },

    render: function() {
        var counts = this.props.counts;
        var org = this.props.value.org || 'all';

        var organizations = this.props.organizations.map(function (organization) {
            var count = (counts && counts.organizations) ? counts.organizations[organization.id] : 0;
            return (
                <div key={ organization.id }>
                    <input id={ "all-listings-filter-organization-" + organization.shortName.toLowerCase() } type="radio" value={ organization.title }/>
                    <label htmlFor={ "all-listings-filter-organization-" + organization.shortName.toLowerCase() } className="label-organization">
                        { organization.shortName }
                        {
                            (org === organization.title || org === 'all') &&
                                <strong className="badge">{ count || 0 }</strong>
                        }
                    </label>
                </div>
            );
        });

        return (
            <div>
                <h4 style={{marginTop: 30}}>Organization</h4>
                <RadioGroup name="organization"
                    value={ org }
                    onChange={ this.handleChange }>
                    <input id="all-listings-filter-organization-all" type="radio" value="all"/>
                    <label htmlFor="all-listings-filter-organization-all" className="label-all">
                        All
                        { org === 'all' && <strong className="badge">{ counts.total }</strong> }
                    </label>
                    { organizations }
                </RadioGroup>
            </div>
        );
    }

});

module.exports = OrgFilter;
