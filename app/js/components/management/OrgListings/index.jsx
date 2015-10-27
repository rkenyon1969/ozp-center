'use strict';

var React = require('react');
var _ = require('../../../utils/_');

var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var ActiveStateMixin = require('../../../mixins/ActiveStateMixin');
var UserRoleMixin = require('../../../mixins/UserRoleMixin');
var PaginatedListingsStore = require('../../../stores/PaginatedListingsStore');
var UnpaginatedListingsStore = require('../../../stores/UnpaginatedListingsStore');

var Sidebar = require('../shared/Sidebar.jsx');
var ApprovalStatusFilter = require('../shared/ApprovalStatusFilter.jsx');
var EnabledFilter = require('../shared/EnabledFilter.jsx');

var LoadMore = require('../shared/LoadMore.jsx');
var TableView = require('../shared/TableView.jsx');

var { UserRole } = require('ozp-react-commons/constants');

var OrgListings = React.createClass({

    mixins: [
        SystemStateMixin,
        ActiveStateMixin,
        UserRoleMixin.OrgSteward,
    ],

    getInitialState: function () {
        var useTableView = JSON.parse(sessionStorage.getItem('center-orgListings-toggleView'));
        if (!this.props.org) {
            this.props.org = null;
        }
        return {
            counts: {},
            filter: _.assign(this.getQuery(), {
                org: this.props.org.params.org
            }),
            tableView: useTableView
        };
    },

    onFilterChanged: function (key, value) {
        this.state.filter[key] = value;
        if(this.state.tableView){
            UnpaginatedListingsStore.filterChange(this.state.filter);
        } else {
            PaginatedListingsStore.filterChange(this.state.filter);
        }
        this.setState({
            filter:this.state.filter
        });
    },

    onViewToggle: function (event) {
        event.preventDefault();
        sessionStorage.setItem("center-orgListings-toggleView", !this.state.tableView);
        this.setState({
            tableView: !this.state.tableView
        });
    },

    onCountsChanged: function (counts) {
        this.setState({
            counts: counts
        });
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.org && (this.props.org.name !== nextProps.org.name)) {
            this.onFilterChanged('org', nextProps.org.params.org);
        }
    },

    renderListings: function () {
        if (this.state.tableView === true) {
            //Classname of tableView was "originally AllListings__listings col-xs-9 col-lg-10"
            return (
                <TableView className="ListingsManagement__TableView"
                    filter={this.state.filter} onCountsChanged={this.onCountsChanged} tableName="OrgListings_Listings"></TableView>
            );
        } else {
            return (
                <LoadMore className="ListingsManagement__LoadMore col-xs-9 col-lg-10 all"
                    filter={this.state.filter} onCountsChanged={this.onCountsChanged}></LoadMore>
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