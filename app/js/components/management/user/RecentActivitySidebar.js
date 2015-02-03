'use strict';

var React = require('react');
var { Link, Navigation } = require('react-router');
var RadioGroup = require('react-radio-group');

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



var RecentActivitySidebar = React.createClass({

    mixins: [ Navigation ],

    render: function () {
        /* jshint ignore:start */
        return (
            <form className="RecentActivity__SidebarFilter">
            <div className="filter-group">
                <h4>Marketplace Overview</h4>
                <AllListingsSidebarFilter handleChange={this.handleChange} />
            </div>
            <div className="filter-group">
                <h4>My Listings Overview</h4>
                <MyListingsSidebarFilter handleChange={this.handleChange} />
            </div>

            </form>
        );
        /* jshint ignore:end */
    }
});

module.exports = RecentActivitySidebar;
