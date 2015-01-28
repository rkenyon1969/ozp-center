'use strict';

var React = require('react');
var Router = require('react-router');
var { RouteHandler } = require('react-router');
var Reflux = require('reflux');
var ListingTile = require('../../listing/ListingTile');
var Sidebar = require('../shared/Sidebar');
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ListingActions = require('../../../actions/ListingActions');
var ProfileActions = require('../../../actions/ProfileActions');

var fetchOwnedListings = ListingActions.fetchOwnedListings;
var fetchOwnedListingsCompleted = ListingActions.fetchOwnedListingsCompleted;
var fetchSelf = ProfileActions.fetchSelf;
var fetchSelfCompleted = ProfileActions.fetchSelfCompleted;

var MyListings = React.createClass({


    mixins: [ Reflux.ListenerMixin, Router.State ],

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
        var filter = this.getQuery().approvalStatus || 'all';

        return {
            listings: this.getListings(),
            filter: filter,
            profile: null
        };
    },

    onStoreChanged: function () {
        this.setState({
            listings: this.getListings()
        });
    },

    onFilterChanged: function (key, filter) {
        if (filter === null) {
            filter = 'all';
        }
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
                <aside className="MyListings__sidebar col-md-2" >
                <Sidebar
                    value={ {approvalStatus: this.state.filter} }
                    listings={ this.state.listings }
                    counts={ {} }
                    onFilterChanged={ this.onFilterChanged }
                    organizations={ [] }
                    view="userView" />
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
