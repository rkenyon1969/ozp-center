'use strict';

var React = require('react');
var ModalLink = require('../ModalLink.jsx');
var { Navigation, History } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var ProfileWindow = require('ozp-react-commons/components/profile/ProfileWindow.jsx');

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
var CenterProfileWindow = React.createClass({
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
            <ProfileWindow profileId={this.props.profileId}
                listingLinkEl={ListingLink}
                backRoute={this.state.backRoute} />
        );
    }
});

module.exports = CenterProfileWindow;
