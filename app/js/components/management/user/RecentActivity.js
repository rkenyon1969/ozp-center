'use strict';

var React = require('react');
var Reflux = require('reflux');
var Sidebar = require('./RecentActivitySidebar');
var ListingActions = require('../../../actions/ListingActions');
var fetchAllChangeLogs = ListingActions.fetchAllChangeLogs;
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ChangeLog = require('../../shared/ChangeLog');
var LoadMore = require('../../shared/LoadMore');
var PaginatedChangeLogStore = require('../../../stores/PaginatedChangeLogStore');



var RecentActivity = React.createClass({

    mixins: [Reflux.listenTo(PaginatedChangeLogStore, 'onChangeLogsReceived')],

    getInitialState: function () {
        return {
            changeLogs: []
        };
    },

    onLoadMore: function() {
        ListingActions.fetchAllChangeLogs();
    },

    onChangeLogsReceived: function() {
        var paginatedList = this.getPaginatedList();
        if (!paginatedList) {
            return;
        }
        var { data, hasMore } = paginatedList;
        this.setState({
            changeLogs: data,
            hasMore: hasMore
        });
    },

    componentDidMount: function () {
        fetchAllChangeLogs();
    },

    getPaginatedList: function () {
        return PaginatedChangeLogStore.getChangeLogs();
    },

    renderChangeLogs: function () {
        var me = this;

        return this.state.changeLogs.map(function (changeLog, i) {

            /* jshint ignore:start */
            return [
                <ChangeLog showListingName={true} changeLog={changeLog} />,
                <br/>
            ];
            /* jshint ignore:end */
        });
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div className="RecentActivity">
                <div className="RecentActivity__Sidebar col-md-3"><Sidebar /></div>

                <LoadMore className="RecentActivity__activities col-md-9 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { this.renderChangeLogs() }
                </LoadMore>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = RecentActivity;
