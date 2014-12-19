'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var AllListingsSidebar = React.createClass({

    propTypes: {
        counts: React.PropTypes.object.isRequired
    },

    handleChange: function (key, evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged(key, value);
    },

    handleEnabledChange: function (evt){
        var {value} = evt.target;
        if(value === 'null') { value = null; }
        if(value === 'true') { value = true; }
        if(value === 'false') { value = false; }
        this.props.onFilterChanged('enabled', value);
    },

    render: function () {
        var counts = this.props.counts;
        counts.disabled = counts.total - counts.enabled;
        var organizations = this.props.organizations
            .map(function (organization) {
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

        /*jshint ignore:start */
        return (
            <form className="Listings__SidebarFilter">
                <h4>State</h4>
                <RadioGroup name="approval-status"
                        value={ this.props.value['approvalStatus'] || 'all' }
                        onChange={ _.partial(this.handleChange, "approvalStatus") }>
                    <input id="all-listings-filter-all" type="radio" value="all" />
                    <label htmlFor="all-listings-filter-all" className="label-all">
                        All
                        <strong className="badge">{ counts.total }</strong>
                    </label>

                    <input id="all-listings-filter-published" type="radio" value="APPROVED"/>
                    <label htmlFor="all-listings-filter-published" className="label-published">
                        Published
                        <strong className="badge">{ counts.APPROVED }</strong>
                    </label>

                    <input id="all-listings-filter-needs-action" type="radio" value="APPROVED_ORG"/>
                    <label htmlFor="all-listings-filter-needs-action" className="label-needs-action">
                        Needs action
                        <strong className="badge">{ counts.APPROVED_ORG }</strong>
                    </label>

                    <input id="all-listings-filter-pending" type="radio" value="PENDING"/>
                    <label htmlFor="all-listings-filter-pending" className="label-pending">
                        Pending, Org.
                        <strong className="badge">{ counts.PENDING }</strong>
                    </label>

                    <input id="all-listings-filter-rejected" type="radio" value="REJECTED"/>
                    <label htmlFor="all-listings-filter-rejected" className="label-rejected">
                        Returned
                        <strong className="badge">{ counts.REJECTED }</strong>
                    </label>

                    <input id="all-listings-filter-draft" type="radio" value="IN_PROGRESS"/>
                    <label htmlFor="all-listings-filter-draft" className="label-draft">
                        Draft
                        <strong className="badge">{ counts.IN_PROGRESS }</strong>
                    </label>
                </RadioGroup >

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

                <h4 style={{marginTop: 30}}>Enabled</h4>
                <RadioGroup name="enabled"
                        value={ (this.props.value['enabled'] === null) ? 'null' : this.props.value['enabled'].toString() }
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
            </form>
        );
        /*jshint ignore:end */
    }
});

module.exports = AllListingsSidebar;
