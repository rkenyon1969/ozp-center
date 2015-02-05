'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_');
var Router = require('react-router');

var AdminRoute = require('../../mixins/AdminRouteMixin');
var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Sidebar = require('./shared/Sidebar');
var ApprovalStatusFilter = require('./shared/ApprovalStatusFilter');
var EnabledFilter = require('./shared/EnabledFilter');
var OrgFilter = require('./shared/OrgFilter');

var ListingTile = require('../listing/ListingTile');
var LoadMore = require('../shared/LoadMore');

var PaginatedListingsStore = require('../../stores/PaginatedListingsStore');

var ListingActions = require('../../actions/ListingActions');
var { UserRole } = require('../../constants');

var AllListings = React.createClass({

    mixins: [
        AdminRoute,
        SystemStateMixin,
        Router.State,
        Reflux.listenTo(PaginatedListingsStore, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.listingChangeCompleted, 'onListingChangeCompleted')
    ],

    getInitialState: function () {
        return {
            counts: {},
            listings: [],
            hasMore: false,
            filter: this.getQuery()
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
    },

    render: function () {
        var sidebarFilterOptions = {
            value: this.state.filter,
            counts: this.state.counts,
            onFilterChanged: this.onFilterChanged,
            organizations: this.state.system.organizations || []
        };

        /* jshint ignore:start */
        return this.transferPropsTo(
            <div className="AllListings row">
                <aside className="AllListings__sidebar col-md-2">
                    <Sidebar>
                        <ApprovalStatusFilter role={ UserRole.ADMIN } { ...sidebarFilterOptions } />
                        <OrgFilter { ...sidebarFilterOptions } />
                        <EnabledFilter { ...sidebarFilterOptions } />
                    </Sidebar>
                </aside>
                <LoadMore className="AllListings__listings col-md-10 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { ListingTile.fromArray(this.state.listings, UserRole.ADMIN) }
                </LoadMore>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = AllListings;
