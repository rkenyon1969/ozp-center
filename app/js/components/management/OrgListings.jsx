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
var ListingRow = require('../listing/ListingRow.jsx');
var TableView = require('../shared/TableView.jsx');

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
        var useTableView = JSON.parse(sessionStorage.getItem('center-orgListings-toggleView'));
        if (!this.props.org) {
            this.props.org = null;
        }
        return {
            counts: {},
            listings: [],
            hasMore: false,
            filter: _.assign(this.getQuery(), {
                org: this.props.org.params.org
            }),
            tableView: useTableView,
            sortKey: "name",
            searchKey: ""
        };
    },

    getPaginatedList: function () {
        return PaginatedListingsStore.getListingsByFilter(this.state.filter);
    },

    getUnpaginatedList: function () {
        return PaginatedListingsStore.getAllListingsByFilter(this.state.filter);
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

    onViewToggle: function (event) {
        event.preventDefault();
        sessionStorage.setItem("center-orgListings-toggleView", !this.state.tableView);
        this.setState({
            tableView: !this.state.tableView
        });
    },

    onStoreChanged: function () {
        var paginatedList = this.getPaginatedList();
        var unpaginatedList = this.getUnpaginatedList();
        if (!paginatedList) {
            return;
        }
        var { data, hasMore, counts } = paginatedList;
        var fullData = unpaginatedList.data;

        this.setState({
            listings: data,
            allListings: fullData,
            hasMore: hasMore,
            counts: counts
        });
    },

    onSearch: function (key) {
        if ( !key || key.length === 0 ) {
            this.setState({searchKey: ""});
        } else {
            this.setState({searchKey: key});
        }
    },

    onSort: function (key) {
        this.setState({sortKey: key});
    },

    onListingChangeCompleted: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.org && (this.props.org.name !== nextProps.org.name)) {
            this.onFilterChanged('org', nextProps.org.params.org);
        }
    },

    componentDidMount: function () {
        this.fetchAllListingsIfEmpty();
    },

    renderListings: function () {
        if (this.state.tableView === true) {
            var data = [];
            if (this.state.allListings) {
                var filteredListings = ListingRow.filterBySearch(this.state.allListings, this.state.searchKey),
                    sortedListings = ListingRow.sortListings(filteredListings, this.state.sortKey);
                data = ListingRow.fromArray(sortedListings, UserRole.ORG_STEWARD, "orgListings-tableView-columns");
            }
            return (
                <div className="AllListings__listings col-xs-9 col-lg-10">
                    <TableView className="table table-condensed table-striped" sortKey={this.state.sortKey} searchKey={this.state.searchKey}
                        onSearch={this.onSearch} onSort={this.onSort} saveKey="orgListings-tableView-columns">

                        {data}
                    </TableView>
                </div>
            );
        } else {
            return (
                <LoadMore className="AllListings__listings col-xs-9 col-lg-10 all"
                    hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { ListingTile.fromArray(this.state.listings, UserRole.ORG_STEWARD) }
                </LoadMore>
            );
        }
    },

    render: function () {
        var sidebarFilterOptions = {
            value: this.state.filter,
            counts: this.state.counts,
            onFilterChanged: this.onFilterChanged,
            organizations: this.state.system.organizations || []
        };
        var toggleSwitch = (this.state.tableView===true) ?
            <span className="switchBox" onClick={this.onViewToggle}>
                <span className="switch-white" title="Grid view">
                    <i className="icon-grid-grayDark"/>
                </span>
                <span className="switch-blueDark" title="Table view">
                    <i className="icon-align-justify-white"/>
                </span>
            </span> :
            <span className="switchBox" onClick={this.onViewToggle}>
                <span className="switch-blueDark" title="Grid view">
                    <i className="icon-grid-white"/>
                </span>
                <span className="switch-white" title="Table view">
                    <i className="icon-align-justify-grayDark"/>
                </span>
            </span> ;

        return this.transferPropsTo(
            <div className="AllListings row">
                <div className="Listings__Sidebar col-xs-3 col-lg-2">
                    <Sidebar>
                        {toggleSwitch}
                        <ApprovalStatusFilter role={ UserRole.ORG_STEWARD } { ...sidebarFilterOptions } />
                        <EnabledFilter { ...sidebarFilterOptions } />
                    </Sidebar>
                </div>
                { this.renderListings() }
            </div>
        );
    }
});

module.exports = OrgListings;
