'use strict';

var React = require('react');
var Reflux = require('reflux');
var { State, Link } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var CurrentProfileStore = require('../../stores/CurrentProfileStore');

var ListingRow = React.createClass({
    mixins: [State, ActiveStateMixin],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    render: function() {
        var listing = this.props.listing,
            queryParams = {
                listing: listing.id,
                action: 'view',
                tab: 'overview'
            };

        /* jshint ignore:start */
        return (
            <li key={listing.id}>
                <Link to={this.getActiveRoute().name} params={this.getParams()}
                        query={queryParams}>
                    <img src={listing.imageMediumIcon} />
                    {listing.title}
                </Link>
            </li>
        );
        /* jshint ignore:end */
    }
});

var ProfileInfo = React.createClass({
    mixins: [Reflux.connect(CurrentProfileStore)],

    componentWillMount: function() {
        ProfileActions.fetchProfile(this.props.profileId);
        ProfileActions.fetchOwnedListings(this.props.profileId);
    },

    render: function() {
        /* jshint ignore:start */
        var profile = this.state.currentUser,
            listings = this.state.ownedListings.map(l => <ListingRow listing={l} />);

        return (
            <dl className="attributes">
                <dt>Name</dt><dd>{profile.displayName}</dd>
                <dt>Username</dt><dd>{profile.username}</dd>
                <dt>Email</dt><dd>{profile.email || 'none available'}</dd>
            </dl>
            <section className="owned-listings">
                <h4>Listings</h4>
                <ul>{listings}</ul>
            </section>
        );
        /* jshint ignore:end */
    }
});

var ProfileWindow = React.createClass({
    propTypes: {
        profileId: React.PropTypes.number
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <Modal className="profile-window">
                <ProfileInfo profileId={this.props.profileId} />
            </Modal>
        );
        /* jshint ignore:end */
    }
});

module.exports = ProfileWindow;
