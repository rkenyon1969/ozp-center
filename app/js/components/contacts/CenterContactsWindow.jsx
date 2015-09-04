'use strict';

var React = require('react');
var ModalLink = require('../ModalLink.jsx');
var { Navigation, History } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var ContactsWindow = require('ozp-react-commons/components/contacts/ContactsWindow.jsx');

var ListingLink = React.createClass({
    render: function() {
        var queryParams = {
                listing: this.props.listingId,
                action: 'view',
                tab: 'overview'
            };

        return (
            <ModalLink queryParams={queryParams}>
                {this.props.children}
            </ModalLink>
        );
    }
});

/**
 * A simple wrapper around the common ProfileWindow
 */
var CenterContactsWindow = React.createClass({
    mixins: [ActiveStateMixin, Navigation],

    getInitialState: function() {
        return {
            backRoute: (History.length > 1) ?
                this.goBack :
                this.getActiveRoutePath()
        };
    },

    render: function() {
        return (
            <ContactsWindow profileId={this.props.profileId}
                listingLinkEl={ListingLink}
                backRoute={this.state.backRoute} />
        );
    }
});

module.exports = CenterContactsWindow;
