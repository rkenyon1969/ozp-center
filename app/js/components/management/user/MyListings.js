'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');
var Reflux = require('reflux');
var ListingTile = require('../../listing/ListingTile');
var MyListingsSidebar = require('./MyListingsSidebar');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ListingActions = require('../../../actions/ListingActions');
var ProfileActions = require('../../../actions/ProfileActions');

var fetchOwnedListings = ListingActions.fetchOwnedListings;
var fetchOwnedListingsCompleted = ListingActions.fetchOwnedListingsCompleted;
var fetchSelf = ProfileActions.fetchSelf;
var fetchSelfCompleted = ProfileActions.fetchSelfCompleted;

var MyListings = React.createClass({

    defaultValue: 'all',

    mixins: [ Reflux.ListenerMixin ],

    componentWillMount: function () {
        this.listenTo(fetchOwnedListingsCompleted, this.onStoreChanged);
        fetchOwnedListings();

        this.listenTo(fetchSelfCompleted, this.onSelfFetched);
        fetchSelf();
    },

    getListings: function (profile) {
        profile = profile || (this.state ? this.state.profile : null);

        return profile ? GlobalListingStore.getByOwner(profile) : [];
    },

    getInitialState: function () {
        return {
            listings: this.getListings(),
            filter: this.defaultValue,
            profile: null
        };
    },

    onStoreChanged: function () {
        this.setState({
            listings: this.getListings()
        });
    },

    onFilterChanged: function (filter) {
        this.setState({
            filter: filter
        });
    },

    onSelfFetched: function (profile) {
        this.setState({
            profile: profile
        });
    },

    render: function () {
        var filter = this.state.filter || '';

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="MyListings row">
                <aside className="Listings__Sidebar col-md-2" >
                    <MyListingsSidebar value={this.state.filter}
                        listings={this.state.listings}
                        onFilterChanged={this.onFilterChanged} />
                </aside>
                <ul className={"MyListings__listings col-md-10 " + filter}>
                    { ListingTile.fromArray(this.state.listings) }
                </ul>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MyListings;
