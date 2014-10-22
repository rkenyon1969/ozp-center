'use strict';

var React = require('react');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var Modal = require('../../shared/Modal');

module.exports = React.createClass({
    getInitialState: function() {
        var listing = GlobalListingStore.getById(this.props.params.listingId);

        return {
            title: listing.title(),
            //steward: listing.currentRejection().author.username,
            //feedback: listing.currentRejection().description
            steward: 'jerry',
            feedback: 'This is junk'
        };
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="FeedbackModal">
                <h3>Steward Feedback</h3>
                <dl>
                    <dt>Listing</dt>
                    <dd>{this.state.title}</dd>
                    <dt>Steward</dt>
                    <dd>{this.state.steward}</dd>
                    <dt>Feedback</dt>
                    <dd className="feedback">{this.state.feedback}</dd>
                </dl>
                <a className="edit" href="edit">Edit this listing</a>
            </Modal>
        );
        /* jshint ignore:end */
    }
});
