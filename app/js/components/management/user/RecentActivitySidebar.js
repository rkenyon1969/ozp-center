'use strict';

var React = require('react');
var { Link, Navigation } = require('react-router');
var RadioGroup = require('react-radio-group');
var ProfileStore = require('../../../stores/ProfileStore');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var _ = require('../../../utils/_');

var MyListingsSidebarFilter = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <RadioGroup name="recent-activity-my-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "REJECTED"}}>
                    <label htmlFor="recent-activity-returned" className="label-needs-action">
                        Returned to Owner
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "PENDING"}}>
                    <label htmlFor="recent-activity-pending" className="label-pending">
                        Pending Review
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "APPROVED"}}>
                    <label htmlFor="recent-activity-published" className="label-published">
                        Published
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>
            </RadioGroup>
        );
        /* jshint ignore:end */
    }

});

var AllListingsSidebarFilter = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <RadioGroup name="recent-activity-all-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "APPROVED_ORG"}}>
                    <label htmlFor="recent-activity-all-returned" className="label-needs-action">
                        Pending AppsMall Review
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "PENDING"}}>
                    <label htmlFor="recent-activity-all-pending" className="label-pending">
                        Pending Organization Review
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "APPROVED"}}>
                    <label htmlFor="recent-activity-all-published" className="label-published">
                        Published
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "REJECTED"}}>
                    <label htmlFor="recent-activity-all-returned" className="label-rejected">
                        Returned to Owner
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>
            </RadioGroup>
        );
        /* jshint ignore:end */
    }

});


var OrgListingsSidebarFilter = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <RadioGroup name="recent-activity-org-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-pending" to="org-listings" query={{approvalStatus: "PENDING"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-pending" className="label-needs-action">
                        Pending { this.props.org.shortName } Review
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-pending" to="org-listings" query={{approvalStatus: "APPROVED_ORG"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-pending" className="label-pending">
                        Pending Marketplace Review
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-published" to="org-listings" query={{approvalStatus: "APPROVED"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-published" className="label-published">
                        Published
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="org-listings" query={{approvalStatus: "REJECTED"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-returned" className="label-rejected">
                        Returned to Owner
                        <i className="fa fa-angle-right fa-2x"></i>
                    </label>
                </Link>
            </RadioGroup>
        );
        /* jshint ignore:end */
    }

});



var RecentActivitySidebar = React.createClass({

    mixins: [ Navigation, SystemStateMixin ],

    renderFilters: function() {
        var me = this;
        var { currentUser, system } = this.state;

        var children = [];
        if (currentUser.isAdmin) {
            children.push(
                /* jshint ignore:start */
                <div className="filter-group">
                    <h4>Marketplace Overview</h4>
                    <AllListingsSidebarFilter handleChange={this.handleChange} />
                </div>
                /* jshint ignore:end */
            );
        }

        if(currentUser.stewardedOrganizations.length > 0 && system.organizations.length > 0) {
            _.forEach(currentUser.stewardedOrganizations, function(orgName) {
                var org = _.find(system.organizations, function(orgObj) {
                    return orgObj.title === orgName;
                });

                children.push(
                    /* jshint ignore:start */
                    <div className="filter-group">
                        <h4>{ org.shortName } Review </h4>
                        <OrgListingsSidebarFilter handleChange={me.handleChange} org={org} />
                    </div>
                    /* jshint ignore:end */
                );

            });
        }

        children.push(
            /* jshint ignore:start */
            <div className="filter-group">
                <h4>My Listings Overview</h4>
                <MyListingsSidebarFilter handleChange={this.handleChange} />
            </div>
            /* jshint ignore:end */
        );

        return children;

    },

    render: function () {

        /* jshint ignore:start */
        return (
            <form className="RecentActivity__SidebarFilter">
                { this.renderFilters() }
            </form>
        );
        /* jshint ignore:end */
    }
});

module.exports = RecentActivitySidebar;
