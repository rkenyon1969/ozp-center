'use strict';

var React = require('react');
var Reflux = require('reflux');
var RadioGroup = require('exports?RadioGroup!react-radio-group');

var MyListingsSidebar = React.createClass({


    handleChange: function(evt) {
        this.props.onFilterChanged(evt.target.value);
    },

    render: function () {
        //object map from approvalStatus to number of listings with that
        //status
        var counts = this.props.listings.reduce(function(acc, i) {
                (acc[i.approvalStatus])++;
                return acc;
            }, {
                APPROVED: 0,
                APPROVED_ORG: 0,
                REJECTED: 0,
                PENDING: 0,
                IN_PROGRESS: 0
            });

        /*jshint ignore:start */
        return (
            <form className="MyListings__approvalStatusFilter">
                <h3>Filter By State</h3>
                <RadioGroup name="approval-status"
                        value={this.props.value}
                        onChange={this.handleChange}>
                    <input id="my-listings-filter-all" type="radio" value="all"/>
                    <label htmlFor="my-listings-filter-all" className="label-all">
                        All
                        <strong className="count">{this.props.listings.length}</strong>
                    </label>
                    <input id="my-listings-filter-published" type="radio" value="published"/>
                    <label htmlFor="my-listings-filter-published" className="label-published">
                        Published
                        <strong className="count">{counts.APPROVED}</strong>
                    </label>
                    <input id="my-listings-filter-needs-action" type="radio"
                        value="needs-action"/>
                    <label htmlFor="my-listings-filter-needs-action"
                            className="label-needs-action">
                        Needs action
                        <strong className="count">{counts.REJECTED}</strong>
                    </label>
                    <input id="my-listings-filter-pending" type="radio" value="pending"/>
                    <label htmlFor="my-listings-filter-pending" className="label-pending">
                        Pending
                        <strong className="count">{counts.PENDING + counts.APPROVED_ORG}</strong>
                    </label>
                    <input id="my-listings-filter-draft" type="radio" value="draft"/>
                    <label htmlFor="my-listings-filter-draft" className="label-draft">
                        Draft
                        <strong className="count">{counts.IN_PROGRESS}</strong>
                    </label>
                </RadioGroup>
            </form>
        );
        /*jshint ignore:end */
    }
});

module.exports = MyListingsSidebar;
