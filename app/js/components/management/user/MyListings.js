'use strict';

var React = require('react');
var Reflux = require('reflux');
var MyListingTile = require('./MyListingTile');
var MyListingsSidebar = require('./MyListingsSidebar');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ListingActions = require('../../../actions/ListingActions');
var ProfileActions = require('../../../actions/ProfileActions');

var fetchOwnedListings = ListingActions.fetchOwnedListings;
var ownedListingsFetched = ListingActions.ownedListingsFetched;
var fetchSelf = ProfileActions.fetchSelf;
var selfFetched = ProfileActions.selfFetched;

var MyListings = React.createClass({

    defaultValue: 'all',

    mixins: [ Reflux.ListenerMixin ],

    componentWillMount: function() {
        this.listenTo(ownedListingsFetched, this.onStoreChanged);
        fetchOwnedListings();

        this.listenTo(selfFetched, this.onSelfFetched);
        fetchSelf();
    },

    getListings: function(profile) {
        profile = profile || (this.state ? this.state.profile : null);

        return profile ? GlobalListingStore.getByOwner(profile) : [];
    },

    getInitialState: function() {
        return {
            listings: this.getListings(),
            filter: this.defaultValue,
            profile: null
        };
    },

    onStoreChanged: function() {
        this.setState({
            listings: this.getListings(),
            filter: this.state.filter,
            profile: this.state.profile
        });
    },

    onFilterChanged: function(filter) {
        this.setState({
            listings: this.state.listings,
            filter: filter,
            profile: this.state.profile
        });
    },

    onSelfFetched: function(profile) {
        this.setState({
            listings: this.getListings(profile),
            filter: this.state.filter,
            profile: profile
        });
    },

    render: function () {
        var tiles = this.state.listings
            .map(function(listing) {
                /* jshint ignore:start */
                return (
                    <MyListingTile listing={listing} />
                );
                /* jshint ignore:end */
            }),
            filter = this.state.filter || '';

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListings">
                <aside className="MyListings__sidebar col-md-3" >
                    <MyListingsSidebar value={this.state.filter}
                        listings={this.state.listings}
                        onFilterChanged={this.onFilterChanged} />
                </aside>
                <ul className={"MyListings__listings col-md-9 " + filter}>{tiles}</ul>
                <this.props.activeRouteHandler />
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
