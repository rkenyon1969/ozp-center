'use strict';

var React = require('react');
var { Link, Navigation } = require('react-router');
var RadioGroup = require('react-radio-group');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var _ = require('../../../utils/_');

var MyListingsSidebarFilter = React.createClass({

    render: function () {
        return (
            <RadioGroup name="recent-activity-my-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "REJECTED"}}>
                    <label htmlFor="recent-activity-returned" className="label-needs-action">
                        <i className="icon-caret-right"></i>
                        <i className="icon-exclamation-14"></i>
                        Returned to Owner
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "PENDING"}}>
                    <label htmlFor="recent-activity-pending" className="label-pending">
                        <i className="icon-caret-right"></i>
                        <i className="icon-loader-14"></i>
                        Pending Review
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="my-listings" query={{approvalStatus: "APPROVED"}}>
                    <label htmlFor="recent-activity-published" className="label-published">
                        <i className="icon-caret-right"></i>
                        <i className="icon-thumbs-up-14"></i>
                        Published
                    </label>
                </Link>
            </RadioGroup>
        );
    }

});

var AllListingsSidebarFilter = React.createClass({

    render: function () {
        return (
            <RadioGroup name="recent-activity-all-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "APPROVED_ORG"}}>
                    <label htmlFor="recent-activity-all-returned" className="label-needs-action">
                        <i className="icon-caret-right"></i>
                        <i className="icon-exclamation-14"></i>
                        Pending Review
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "PENDING"}}>
                    <label htmlFor="recent-activity-all-pending" className="label-pending">
                        <i className="icon-caret-right"></i>
                        <i className="icon-loader-14"></i>
                        Pending Organization Review
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "APPROVED"}}>
                    <label htmlFor="recent-activity-all-published" className="label-published">
                        <i className="icon-caret-right"></i>
                        <i className="icon-thumbs-up-14"></i>
                        Published
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="all-listings" query={{approvalStatus: "REJECTED"}}>
                    <label htmlFor="recent-activity-all-returned" className="label-rejected">
                        <i className="icon-caret-right"></i>
                        <i className="icon-reload-14"></i>
                        Returned to Owner
                    </label>
                </Link>
            </RadioGroup>
        );
    }

});


var OrgListingsSidebarFilter = React.createClass({

    render: function () {
        return (
            <RadioGroup name="recent-activity-org-listings" onChange={this.props.handleChange}>
                <Link id="recent-activity-pending" to="org-listings" query={{approvalStatus: "PENDING"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-pending" className="label-needs-action">
                        <i className="icon-exclamation-14"></i>
                        Pending { this.props.org.shortName } Review
                        <i className="icon-caret-right"></i>
                    </label>
                </Link>

                <Link id="recent-activity-pending" to="org-listings" query={{approvalStatus: "APPROVED_ORG"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-pending" className="label-pending">
                        <i className="icon-loader-14"></i>
                        Organization Approved
                        <i className="icon-caret-right"></i>
                    </label>
                </Link>

                <Link id="recent-activity-published" to="org-listings" query={{approvalStatus: "APPROVED"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-published" className="label-published">
                        <i className="icon-thumbs-up-14"></i>
                        Published
                        <i className="icon-caret-right"></i>
                    </label>
                </Link>

                <Link id="recent-activity-returned" to="org-listings" query={{approvalStatus: "REJECTED"}} params={{org: this.props.org.title}}>
                    <label htmlFor="recent-activity-org-returned" className="label-rejected">
                        <i className="icon-reload-14"></i>
                        Returned to Owner
                        <i className="icon-caret-right"></i>
                    </label>
                </Link>
            </RadioGroup>
        );
    }

});



var RecentActivitySidebar = React.createClass({

    mixins: [ Navigation, SystemStateMixin ],

    renderFilters: function() {
        var me = this;
        var { currentUser, system } = this.state;

        var children = [];
        if (currentUser.isAdmin()) {
            children.push(
                <div key="center-overview" className="filter-group">
                    <h4>Center Overview</h4>
                    <AllListingsSidebarFilter handleChange={this.handleChange} />
                </div>
            );
        }

        if(currentUser.stewardedOrganizations.length > 0 && system.organizations.length > 0) {
            _.forEach(currentUser.stewardedOrganizations, function(orgName, i) {
                var org = _.find(system.organizations, function(orgObj) {
                    return orgObj.title === orgName;
                });

                children.push(
                    <div key={`${orgName}.steward.${i}`}  className="filter-group">
                        <h4>{ org.shortName } Review </h4>
                        <OrgListingsSidebarFilter handleChange={me.handleChange} org={org} />
                    </div>
                );

            });
        }

        children.push(
            <div key="listings-overview" className="filter-group">
                <h4>My Listings Overview</h4>
                <MyListingsSidebarFilter handleChange={this.handleChange} />
            </div>
        );

        return children;
    },

    render: function () {
        return (
            <form className="RecentActivity__SidebarFilter">
                { this.renderFilters() }
            </form>
        );
    }
});

module.exports = RecentActivitySidebar;
