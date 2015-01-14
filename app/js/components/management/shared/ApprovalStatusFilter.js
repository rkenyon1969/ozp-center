'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');

var ApprovalStatusFilter = React.createClass({
    handleChange: function (key, evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged(key, value);
    },

    render: function() {
        var counts = this.props.counts;

        if(this.props.view === 'adminView') {
            /*jshint ignore:start */
            var view =
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
                </RadioGroup >;
                /*jshint ignore:end */
        } else if(this.props.view === 'orgView') {
            /*jshint ignore:start */
            var view =
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
                    <input id="all-listings-filter-needs-action" type="radio" value="PENDING"/>
                    <label htmlFor="all-listings-filter-needs-action" className="label-needs-action">
                        Needs action
                        <strong className="badge">{ counts.APPROVED_ORG }</strong>
                    </label>
                    <input id="all-listings-filter-pending" type="radio" value="APPROVED_ORG"/>
                    <label htmlFor="all-listings-filter-pending" className="label-pending">
                        Org approved
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
                </RadioGroup >;
                /*jshint ignore:end */
        } else {
            /*jshint ignore:start */
            var view =
                <RadioGroup name="approval-status"
                value={this.props.value}
                onChange={this.handleChange}>
                    <input id="my-listings-filter-all" type="radio" value="all"/>
                    <label htmlFor="my-listings-filter-all" className="label-all">
                        All
                        <strong className="badge">{this.props.listings.length}</strong>
                    </label>
                    <input id="my-listings-filter-published" type="radio" value="published"/>
                    <label htmlFor="my-listings-filter-published" className="label-published">
                        Published
                        <strong className="badge">{counts.APPROVED}</strong>
                    </label>
                    <input id="my-listings-filter-needs-action" type="radio"
                    value="needs-action"/>
                    <label htmlFor="my-listings-filter-needs-action"
                    className="label-needs-action">
                        Needs action
                        <strong className="badge">{counts.REJECTED}</strong>
                    </label>
                    <input id="my-listings-filter-pending" type="radio" value="pending"/>
                    <label htmlFor="my-listings-filter-pending" className="label-pending">
                        Pending
                        <strong className="badge">{ counts.PENDING + counts.APPROVED_ORG }</strong>
                    </label>
                    <input id="my-listings-filter-draft" type="radio" value="draft"/>
                    <label htmlFor="my-listings-filter-draft" className="label-draft">
                        Draft
                        <strong className="badge">{counts.IN_PROGRESS}</strong>
                    </label>
                </RadioGroup>
                /*jshint ignore:end */
        }

        return (
            /*jshint ignore:start */
            <div>
                <h4>State</h4>
                { view }
            </div>
            /*jshint ignore:end */
        );


    }

});

module.exports = ApprovalStatusFilter;
