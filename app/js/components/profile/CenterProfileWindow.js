'use strict';

var React = require('react');
var ModalLink = require('../ModalLink');
var { Navigation, History } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var ProfileWindow = require('ozp-react-commons/components/profile/ProfileWindow');

var ListingLink = React.createClass({
    render: function() {
        var queryParams = {
                listing: this.props.listingId,
                action: 'view',
                tab: 'overview'
            };

        /*jshint ignore:start */
        return (
            <ModalLink queryParams={queryParams}>
                {this.props.children}
            </ModalLink>
        );
        /*jshint ignore:end */
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
                this.goBack.bind(this) :
                this.getActiveRoutePath()
        };
    },

    render: function() {
        /*jshint ignore:start */
        return (
            <ProfileWindow profileId={this.props.profileId}
                listingLinkEl={ListingLink}
                backRoute={this.state.backRoute} />
        );
        /*jshint ignore:end */
    }
});

module.exports = CenterProfileWindow;
