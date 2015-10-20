'use strict';

var React = require('react');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var Modal = require('ozp-react-commons/components/Modal.jsx');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

module.exports = React.createClass({

    propTypes: {
        /**
         * Listing ID
         */
        listing: React.PropTypes.string.isRequired
    },

    mixins: [Navigation],

    getInitialState: function () {
        var listing = GlobalListingStore.getById(this.props.listing),
            rejection = listing ? listing.currentRejection : null;

        return rejection ? {
            title: listing.title,
            steward: rejection.author.displayName,
            feedback: rejection.description
        } : {
            title: '',
            steward: '',
            feedback: ''
        };
    },

    render: function () {
        return (
            <Modal ref="modal" className="FeedbackModal" size="small">
                <button className="close corner" onClick={ this.close }><i className="icon-cross-16-grayDark"></i></button>
                <h3>Steward Feedback</h3>
                <dl>
                    <dt>Listing</dt>
                    <dd>{this.state.title}</dd>
                    <dt>Steward</dt>
                    <dd>{this.state.steward}</dd>
                    <dt>Feedback</dt>
                    <dd className="feedback">{this.state.feedback}</dd>
                </dl>
                <Link className="btn btn-primary edit" to="edit"
                        params={{listingId: this.props.listing}}>
                    Edit this listing
                </Link>
            </Modal>
        );
    },

    close: function () {
        this.goBack();
    },

    componentWillUnmount: function() {
        this.refs.modal.close();
    }
});
