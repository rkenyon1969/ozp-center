'use strict';

var React = require('react');
var ModalLink = require('../ModalLink');

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
    render: function() {
        /*jshint ignore:start */
        return (
            <ProfileWindow profileId={this.props.profileId}
                listingLinkEl={ListingLink} />
        );
        /*jshint ignore:end */
    }
});

module.exports = CenterProfileWindow;
