'use strict';

var React = require('react');
var { Link, Navigation } = require('react-router');
var RadioGroup = require('react-radio-group');

var MyListingsSidebarFilter = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <RadioGroup name="recent-activity-my-listings" onChange={this.props.handleChange}>
                <input id="recent-activity-returned" type="radio" value="my-listings:needs-action" />
                <label htmlFor="recent-activity-returned" className="label-needs-action">
                    Returned to Owner
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
                <input id="recent-activity-pending" type="radio" value="my-listings:pending" />
                <label htmlFor="recent-activity-pending" className="label-pending">
                    Pending Review
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
                <input id="recent-activity-published" type="radio" value="my-listings:published" />
                <label htmlFor="recent-activity-published" className="label-published">
                    Published
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
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
                <input id="recent-activity-all-returned" type="radio" value="all-listings:needs-action" />
                <label htmlFor="recent-activity-all-returned" className="label-needs-action">
                    Pending AppsMall Review
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
                <input id="recent-activity-all-pending" type="radio" value="all-listings:pending"/>
                <label htmlFor="recent-activity-all-pending" className="label-pending">
                    Pending Organization Review
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
                <input id="recent-activity-all-published" type="radio" value="all-listings:published"/>
                <label htmlFor="recent-activity-all-published" className="label-published">
                    Published
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
                <input id="recent-activity-all-returned" type="radio" value="all-listings:rejected"/>
                <label htmlFor="recent-activity-all-returned" className="label-rejected">
                    Returned to Owner
                    <i className="fa fa-angle-right fa-2x"></i>
                </label>
            </RadioGroup>
        );
        /* jshint ignore:end */
    }

});



var RecentActivitySidebar = React.createClass({

    mixins: [ Navigation ],

    handleChange: function(evt) {
        var details = evt.target.value.split(":");
        this.transitionTo(details[0], details[1]);
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <form className="RecentActivity__SidebarFilter">
            <div className="filter-group">
                <h4>AppsMall Overview</h4>
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
