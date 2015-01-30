'use strict';

var React = require('react');
var { Link } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var ProfileWindow = require('ozp-react-commons/components/profile/ProfileWindow');

var ListingLink = React.createClass({
    mixins: [ActiveStateMixin],

    propTypes: {
        listingId: React.PropTypes.number.isRequired
    },

    getInitialState: function() {
        return {
            activeRoute: this.getActiveRoute(),
            routeParams: this.getParams()
        };
    },

    render: function() {
        var queryParams = {
                listing: this.props.listingId,
                action: 'view',
                tab: 'overview'
            };

        /*jshint ignore:start */
        return (
            <Link to={this.state.activeRoute.name} params={this.state.routeParams}
                    query={queryParams}>
                {this.props.children}
            </Link>
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
