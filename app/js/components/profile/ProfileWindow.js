'use strict';

var React = require('react');
var Reflux = require('reflux');
var { State, Link, Navigation } = require('react-router');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');

var Modal = require('../shared/Modal');

var CurrentProfileStore = require('../../stores/CurrentProfileStore');
var ProfileActions = require('../../actions/ProfileActions');

var ListingRow = React.createClass({
    mixins: [ActiveStateMixin],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            activeRoute: this.getActiveRoute(),
            routeParams: this.getParams()
        };
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
            <li key={listing.id} className="listing">
                <Link to={this.state.activeRoute.name} params={this.state.routeParams}
                        query={queryParams}>
                    <img src={listing.imageMediumUrl} />
                    {listing.title}
                </Link>
            </li>
        );
        /* jshint ignore:end */
    }
});

var ProfileInfo = React.createClass({
    mixins: [Reflux.connect(CurrentProfileStore)],

    getInitialState: function() {
        return {profile: null, ownedListings: []};
    },

    componentWillMount: function() {
        ProfileActions.fetchProfile(this.props.profileId);
        ProfileActions.fetchOwnedListings(this.props.profileId);
    },

    render: function() {
        /* jshint ignore:start */
        var profile = this.state.profile,
            listings = this.state.ownedListings.map(l => <ListingRow listing={l} />);

        if (profile) {
            return (
                <section className="profile-info">
                    <dl className="attributes">
                        <dt>Name</dt><dd>{profile.displayName}</dd>
                        <dt>Username</dt><dd>{profile.username}</dd>
                        <dt>Email</dt><dd>{profile.email || 'none available'}</dd>
                    </dl>
                    <section className="owned-listings">
                        <h4>Listings</h4>
                        <ul>{listings}</ul>
                    </section>
                </section>
            );
        }
        else {
            return (
                <span className="loading">Loading profile information…</span>
            );
        }
        /* jshint ignore:end */
    }
});

var ProfileWindow = React.createClass({
    mixins: [Navigation],

    propTypes: {
        profileId: React.PropTypes.number
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="profile-window" size="small">
                <header>
                    <h3>Profile</h3>
                    <button className="close" onClick={this.close}>×</button>
                </header>
                <ProfileInfo profileId={this.props.profileId} />
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function() {
        this.refs.modal.close();
        this.goBack();
    }
});

module.exports = ProfileWindow;
