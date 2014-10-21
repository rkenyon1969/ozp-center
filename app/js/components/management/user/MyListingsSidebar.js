'use strict';

var React = require('react');
var Reflux = require('reflux');
var RadioGroup = require('exports?RadioGroup!react-radio-group');

var MyListingsSidebar = React.createClass({


    handleChange: function(evt) {
        this.props.onFilterChanged(evt.target.value);
    },

    render: function() {
        /*jshint ignore:start */
        return (
            <form className="MyListings__approvalStatusFilter">
                <h3>Filter By State</h3>
                <RadioGroup name="approval-status"
                        defaultValue={this.props.defaultValue}
                        onChange={this.handleChange}>
                    <label className="label-all">
                        <input type="radio" value="all"/>All
                    </label>
                    <label className="label-published">
                        <input type="radio" value="published"/>Published
                    </label>
                    <label className="label-needs-action">
                        <input type="radio" value="needs-action"/>Needs action
                    </label>
                    <label className="label-pending">
                        <input type="radio" value="pending"/>Pending
                    </label>
                    <label className="label-draft">
                        <input type="radio" value="draft"/>Draft
                    </label>
                </RadioGroup>
            </form>
        );
        /*jshint ignore:end */
    }
});

module.exports = MyListingsSidebar;
