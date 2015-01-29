'use strict';

var React = require('react');
var _ = require('../../utils/_');
var ChangeLogs = require('./ChangeLogs');
var ListingActions = require('../../actions/ListingActions');
var fetchChangeLogs = ListingActions.fetchChangeLogs;
var saveListing = ListingActions.save;
var rejectListing = ListingActions.reject;
var enableListing = ListingActions.enable;
var disableListing = ListingActions.disable;
var approveListingByOrg = ListingActions.approveByOrg;
var approveListing = ListingActions.approve;
var OzpAnalytics = require('../../analytics/ozp-analytics');
var listingStatus = require('../../constants').approvalStatus;
var { UserRole } = require('../../constants');
var { form, Str, subtype, struct } = require('tcomb-form');

var Toggle = React.createClass({
    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        var title = this.props.title;

        /* jshint ignore:start */
        return (
            <section className={this.props.className}>
                <h5>{title}</h5>
                <hr/>
                <p>{this.props.description}</p>
                <label className="switch">{this.props.label || title}:
                    <input type="checkbox" ref="checkbox" className="ios brand-success"
                        checked={this.props.checked} onChange={this.props.onChange} />
                    <div className="track"><div className="knob"></div></div>
                </label>
            </section>
        );
        /* jshint ignore:end */
    }
});

var EnabledControl = React.createClass({
    shouldComponentUpdate: function (newProps) {
        return newProps.listing.isEnabled !== this.props.isEnabled;
    },

    render: function () {
        var listing = this.props.listing,
            enabled = listing.isEnabled,
            title = enabled ? 'Enabled' : 'Disabled',
            description = 'This listing is ' + (enabled ? '' : 'not') + ' visible to users',
            onChange = enabled ? disableListing.bind(null, listing) :
                enableListing.bind(null, listing);

        /* jshint ignore:start */
        return (
            <Toggle title={title} label="Enabled" className="enabled-toggle"
                description={description}
                checked={enabled}
                onChange={onChange}/>
        );
        /* jshint ignore:end */
    }
});

var FeaturedControl = React.createClass({
    onChange: function (evt) {
        ListingActions.setFeatured(evt.target.checked, this.props.listing);
    },

    shouldComponentUpdate: function (newProps) {
        return newProps.listing.isFeatured !== this.props.isFeatured;
    },

    render: function () {
        var listing = this.props.listing,
            featured = listing.isFeatured,
            title = 'Featured',
            description = 'This listing is ' + (featured ? '' : 'not') +
                ' featured on the Discovery Page';

        /* jshint ignore:start */
        return (
            <Toggle title={title} label="Featured" className="featured-toggle"
                description={description}
                checked={featured}
                onChange={this.onChange}/>
        );
        /* jshint ignore:end */
    }
});

var AdministrationTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return { editingRejection: false };
    },

    componentWillReceiveProps: function (newProps) {
        if (this.props.listing.id !== newProps.listing.id) {
            fetchChangeLogs(newProps.listing.id);
        }
    },

    componentWillMount: function () {
        if (this.props.listing.id) {
            fetchChangeLogs(this.props.listing.id);
        }
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="tab-pane active Quickview__Changelog row">
                { this.renderStatus() }
                <div className="col-md-8 col-right">
                    <section>
                        <h5>Listing Changes</h5>
                        <hr/>
                        <ChangeLogs showListingName={ false } org={this.props.listing.agency}/>
                    </section>
                </div>
            </div>
        );
        /* jshint ignore:end */
    },

    renderStatus: function () {
        var listing = this.props.listing,
            status = listingStatus[listing.approvalStatus],
            statusText = status,
            isAdmin = UserRole[this.props.currentUser.highestRole] >= UserRole.ADMIN,
            isStewardOfOrg = _.contains(this.props.currentUser.stewardedOrganizations, listing.agency),
            controls, statusClass;

        switch (status) {
            case 'Published':
                /* jshint ignore:start */
                var enabledControl =
                        <EnabledControl key="enabled" listing={this.props.listing} />;

                controls = isAdmin ? [
                        enabledControl,
                        <FeaturedControl key="featured" listing={this.props.listing} />
                    ] : [enabledControl]
                /* jshint ignore:end */

                statusClass = 'label-published';
                break;
            case 'Pending, Organization':
                if (isStewardOfOrg || isAdmin) {
                    controls = this.renderReviewSection();
                    statusClass = 'label-needs-action';
                } else {
                    controls = [];
                    statusClass = 'label-pending';
                }
                break;
            case 'Pending, AppsMall':
                if (isAdmin) {
                    controls = this.renderReviewSection();
                    statusClass = 'label-needs-action';
                } else {
                    controls = [];
                    statusClass = 'label-pending';
                }
                break;

            case 'Returned to Owner':
                statusClass = 'label-needs-action';
                controls = [];
                break;
            case 'Draft':
                statusClass = 'label-draft';
                controls = [];
                break;
        }

        /* jshint ignore:start */
        return (
            <div className="col-md-4 col-left ListingAdmin__Controls">
                <section>
                    <h5>Listing Status</h5>
                    <hr/>
                    <p className={ statusClass }>{ statusText }</p>
                </section>
                { controls }
            </div>
        );
        /* jshint ignore:end */
    },

    renderReviewSection: function () {
        var editing = this.state.editingRejection,
            listing = this.props.listing;

        var Justification = form.createForm(
            struct({ description: subtype(Str, s => s.length >= 1 && s.length <= 2000) }),
            { fields: { description: {
                type: 'textarea',
                message: 'A justification is required. It can be up to 2000 characters in length.'
            }}}
        );

        /* jshint ignore:start */
        if (editing) {
            return (
                <section className="return-feedback">
                    <h5>Return to Owner Feedback</h5>
                    <hr/>
                    <p>Please provide feedback for the listing owner about what they should do to make this listing ready for publication</p>
                    <form>
                        <Justification ref="justification" />
                        <button type="button" className="btn" onClick={ this.cancelRejection }>Cancel</button>
                        <button type="button" className="btn btn-warning" onClick={ this.returnToOwner }>Return to Owner</button>
                    </form>
                </section>
            );
        } else {
            return (
                <section className="review-listing">
                    <h5>Review Listing</h5>
                    <hr/>
                    <button type="button" className="btn btn-success" onClick={ this.approve }>Approve</button>
                    <button type="button" className="btn btn-warning" onClick={ this.editRejection }>Return to Owner</button>
                </section>
            );
        }
        /* jshint ignore:end */

    },

    editRejection: function (event) {
        event.preventDefault();
        this.setState({ editingRejection: true });
    },

    returnToOwner: function (event) {
        event.preventDefault();
        var justification = this.refs.justification.getValue();
        if (justification) {
            rejectListing(this.props.listing.id, justification.description);
            this.setState({ editingRejection: false });
        }
    },

    cancelRejection: function (event) {
        event.preventDefault();
        this.setState({ editingRejection: false });
    },

    approve: function (event) {
        event.preventDefault();
        if (listingStatus[this.props.listing.approvalStatus] === 'Pending, Organization') {
            approveListingByOrg(this.props.listing);

            OzpAnalytics.trackListingOrgApproval(this.props.listing.title);
        } else {
            approveListing(this.props.listing);

            OzpAnalytics.trackListingApproval(this.props.listing.title);
        }
    }

});

module.exports = AdministrationTab;
