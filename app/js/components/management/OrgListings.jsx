'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_');

var SystemStateMixin = require('../../mixins/SystemStateMixin');
var ActiveStateMixin = require('../../mixins/ActiveStateMixin');
var UserRoleMixin = require('../../mixins/UserRoleMixin');

var Sidebar = require('./shared/Sidebar.jsx');
var ApprovalStatusFilter = require('./shared/ApprovalStatusFilter.jsx');
var EnabledFilter = require('./shared/EnabledFilter.jsx');
var ListingTile = require('../listing/ListingTile.jsx');
var LoadMore = require('../shared/LoadMore.jsx');

var PaginatedListingsStore = require('../../stores/PaginatedListingsStore');

var ListingActions = require('../../actions/ListingActions');
var { UserRole } = require('ozp-react-commons/constants');

var OrgListings = React.createClass({

    mixins: [
        SystemStateMixin,
        ActiveStateMixin,
        UserRoleMixin.OrgSteward,
        Reflux.listenTo(PaginatedListingsStore, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.listingChangeCompleted, 'onListingChangeCompleted')
    ],

    getInitialState: function () {
        return {
            counts: {},
            listings: [],
            hasMore: false,
            filter: _.assign(this.getQuery(), {
                org: this.props.org.params.org
            })
        };
    },

    getPaginatedList: function () {
        return PaginatedListingsStore.getListingsByFilter(this.state.filter);
    },

    fetchAllListingsIfEmpty: function () {
        var listings = this.getPaginatedList();
        if (!listings) {
            ListingActions.fetchAllListings(this.state.filter);
        }
        else {
            this.onStoreChanged();
        }
    },

    onLoadMore: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    onFilterChanged: function (key, value) {
        this.state.filter[key] = value;
        this.fetchAllListingsIfEmpty();
        this.forceUpdate();
        this.onStoreChanged();
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

    componentWillReceiveProps: function(nextProps) {
        if (this.props.org.name !== nextProps.org.name) {
            this.onFilterChanged('org', nextProps.org.params.org);
        }
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
        return this.transferPropsTo(
            <div className="AllListings row">
                <div className="Listings__Sidebar col-xs-3 col-lg-2">
                    <Sidebar>
                        <ApprovalStatusFilter role={ UserRole.ORG_STEWARD } { ...sidebarFilterOptions } />
                        <EnabledFilter { ...sidebarFilterOptions } />
                    </Sidebar>
                </div>
                <LoadMore className="AllListings__listings col-xs-9 col-lg-10 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { ListingTile.fromArray(this.state.listings, UserRole.ORG_STEWARD) }
                </LoadMore>
            </div>
    );
}

});

module.exports = OrgListings;
