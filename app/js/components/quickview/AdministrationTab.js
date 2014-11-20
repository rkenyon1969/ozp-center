'use strict';

var React = require('react');
var ChangeLogs = require('./ChangeLogs');
var ListingActions = require('../../actions/ListingActions');
var fetchChangeLogs = ListingActions.fetchChangeLogs;
var saveListing = ListingActions.save;
var rejectListing = ListingActions.reject;
var enableListing = ListingActions.enable;
var disableListing = ListingActions.disable;
var approveListing = ListingActions.approve;
var listingStatus = require('../../constants').approvalStatus;
var { UserRole } = require('../../constants');

var EnabledControl = React.createClass({
    propTypes: {
        listing: React.PropTypes.object
    },

    render: function () {
        var listing = this.props.listing,
            enabled = listing.isEnabled;

        /* jshint ignore:start */
        return (
            <section>
                <h5>{enabled ? 'Enabled' : 'Disabled'}</h5>
                <hr/>
                <p>This listing is {enabled ? '' : 'not'} visible to users</p>
                <label className="switch">Enabled:
                    <input type="checkbox" ref="checkbox" className="ios brand-success" checked={enabled}
                        onChange={enabled ? disableListing.bind(null, listing) : enableListing.bind(null, listing)} />
                    <div className="track"><div className="knob"></div></div>
                </label>
            </section>
        );
        /* jshint ignore:end */
    }
});

var AdministrationTab = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    componentWillMount: function () {
        fetchChangeLogs(this.props.listing.id);
    },

    getInitialState: function () {
        return { editingRejection: false };
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="tab-pane active Quickview__Changelog row">
                {this.renderStatus()}
                <div className="col-md-8 col-right">
                    <section>
                        <h5>Listing Changes</h5>
                        <hr/>
                        <ChangeLogs changeLogs={this.props.changeLogs} showListingName={false} />
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
            controls, statusClass;

        switch (status) {
            case 'Published':
                /* jshint ignore:start */
                controls = <EnabledControl listing={this.props.listing} />;
                /* jshint ignore:end */
                statusClass = 'label-published';
                break;
            case 'Pending':
                statusText += ', ' + listing.agency;
                controls = isAdmin ? this.renderReviewSection() : '';
                statusClass = 'label-pending';
                break;
            case 'Returned to Owner':
                statusClass = 'label-needs-action';
                controls = '';
                break;
            case 'Draft':
                statusClass = 'label-draft';
                controls = '';
                break;
        }

        /* jshint ignore:start */
        return (
            <div className="col-md-4 col-left">
                <section>
                    <h5>Listing Status</h5>
                    <hr/>
                    <p className={statusClass}>{statusText}</p>
                </section>
                {controls}
            </div>
        );
        /* jshint ignore:end */
    },

    renderReviewSection: function () {
        var editing = this.state.editingRejection,
            listing = this.props.listing;

        /* jshint ignore:start */
        if (editing) {
            return (
                <section>
                    <h5>Return to Owner Feedback</h5>
                    <hr/>
                    <p>Please provide feedback for the listing owner about what they should do to make this listing ready for publication</p>
                    <textarea ref="justification"></textarea>
                    <button type="button" className="btn" onClick={this.cancelRejection}>Cancel</button>
                    <button type="button" className="btn btn-warning" onClick={this.returnToOwner}>Return to Owner</button>
                </section>
            );
        } else {
            return (
                <section>
                    <h5>Review Listing</h5>
                    <hr/>
                    <button type="button" className="btn btn-success" onClick={this.approve}>Approve</button>
                    <button type="button" className="btn btn-warning" onClick={this.editRejection}>Return to Owner</button>
                </section>
            );
        }
        /* jshint ignore:end */

    },

    editRejection: function (event) {
        event.preventDefault();
        this.setState({editingRejection: true});
    },

    returnToOwner: function (event) {
        event.preventDefault();
        var justification = this.refs.justification.getDOMNode().value;
        rejectListing(this.props.listing.id, justification);
        this.setState({editingRejection: false});
    },

    cancelRejection: function (event) {
        event.preventDefault();
        this.setState({editingRejection: false});
    },

    approve: function (event) {
        event.preventDefault();
        approveListing(this.props.listing);
    }

});

module.exports = AdministrationTab;
