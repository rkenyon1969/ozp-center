'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_');

var AdminRoute = require('../../mixins/AdminRouteMixin');
var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Sidebar = require('./shared/Sidebar');
var ListingTile = require('../listing/ListingTile');
var LoadMore = require('../shared/LoadMore');

var PaginatedListingsStore = require('../../stores/PaginatedListingsStore');

var ListingActions = require('../../actions/ListingActions');


var AllListings = React.createClass({

    mixins: [ AdminRoute, SystemStateMixin ],

    getInitialState: function () {
        return {
            counts: {},
            listings: [],
            hasMore: false,
            filter: {
                approvalStatus: null,
                org: null,
                enabled: null
            }
        };
    },

    getPaginatedList: function () {
        return PaginatedListingsStore.getListingsByFilter(this.state.filter);
    },

    fetchAllListingsIfEmpty: function () {
        var listings = PaginatedListingsStore.getListingsByFilter(this.state.filter);
        if (!listings) {
            ListingActions.fetchAllListings(this.state.filter);
        }
        this.onStoreChanged();
    },

    onLoadMore: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    onFilterChanged: function (key, value) {
        this.state.filter[key] = value;
        this.fetchAllListingsIfEmpty();
        this.setState({
            filter: this.state.filter
        });
    },

    onStoreChanged: function () {
        var paginatedList = this.getPaginatedList();
        if (!paginatedList) {
            return;
        }
        var { data, hasMore, counts } = paginatedList;

        this.setState({
            listings: data,
            hasMore: hasMore,
            counts: counts
        });
    },

    onListingChangeCompleted: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    componentDidMount: function () {
        this.fetchAllListingsIfEmpty();
        this.listenTo(PaginatedListingsStore, this.onStoreChanged);
        this.listenTo(ListingActions.listingChangeCompleted, this.onListingChangeCompleted);
    },

    render: function () {
        this.state.listings.forEach(function(listing){
            listing.view = 'adminView';
        });

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="AllListings row">
                <aside className="AllListings__sidebar col-md-2">
                    <Sidebar
                        value={ this.state.filter }
                        listings={ this.state.listings }
                        counts={ this.state.counts }
                        onFilterChanged={ this.onFilterChanged }
                        organizations={ this.state.system.organizations || [] }
                        view='adminView' />
                </aside>
                <LoadMore className="AllListings__listings col-md-10 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { ListingTile.fromArray(this.state.listings) }
                </LoadMore>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = AllListings;
