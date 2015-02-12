'use strict';

var React = require('react');
var { Navigation } = require('react-router');
var Sidebar = require('./RecentActivitySidebar.jsx');
var ListingActions = require('../../../actions/ListingActions');
var ChangeLog = require('../../shared/ChangeLog.jsx');
var LoadMore = require('../../shared/LoadMore.jsx');
var PaginatedChangeLogStore = require('../../../stores/PaginatedChangeLogStore');
var ActiveState = require('../../../mixins/ActiveStateMixin');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');


var RecentActivity = React.createClass({

    mixins: [
        Navigation,
        ActiveState,
        SystemStateMixin
    ],

    getInitialState: function () {
        return {
            changeLogs: []
        };
    },

    componentDidMount: function () {
        this.fetchAllChangeLogsIfEmpty();
        this.listenTo(PaginatedChangeLogStore, this.onChangeLogsReceived);
    },

    onLoadMore: function() {
        ListingActions.fetchAllChangeLogs(this.state.currentUser);
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

    createLink: function (changeLog) {
        var action = changeLog.action;

        var noActions = [
            'MODIFIED',
            'ADD_RELATED_TO_ITEM',
            'REMOVE_RELATED_TO_ITEM',
            'REJECTED',
            'TAG_CREATED',
            'TAG_DELETED'
        ];

        if (noActions.indexOf(action) > -1) {
            return;
        } else {
            var linkMap = {
                'APPROVED' : 'View',
                'SUBMITTED' : 'View Submission',
                'ENABLED' : 'View',
                'DISABLED' : 'View',
                'CREATED' : 'View Draft',
                'APPROVED_ORG' : 'Review Listing',
                'REVIEW_EDITED' : 'View',
                'REVIEW_DELETED' : 'View'
            };

            var href = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
                listing: changeLog.listing.id,
                action: 'view',
                tab: 'overview'
            });

            if (!this.state.currentUser.isAdmin()) {
                linkMap.APPROVED_ORG = 'View';
            }

            if (this.state.currentUser.highestRole === 'ORG_STEWARD') {
                linkMap.SUBMITTED = 'Review Listing';
            }

            return (
                <a href={href}>{ linkMap[action] } <i className="fa fa-angle-right"></i></a>
            );
        }
    },

    getPaginatedList: function () {
        return PaginatedChangeLogStore.getChangeLogs();
    },

    fetchAllChangeLogsIfEmpty: function () {
        var changeLogs = this.getPaginatedList();
        if (!changeLogs) {
            ListingActions.fetchAllChangeLogs(this.state.currentUser);
        }
        this.onChangeLogsReceived();
    },

    renderChangeLogs: function () {
        var me = this;

        return this.state.changeLogs.map(function (changeLog) {

            return [
                <ChangeLog showListingName={true} changeLog={changeLog}>
                    { changeLog.listing.iconUrl ? <img className="recent-activity-icon" src={ changeLog.listing.iconUrl } /> : <div></div> }
                    { me.createLink(changeLog) }
                </ChangeLog>,
                <br/>
            ];
        });
    },

    render: function () {
        return (
            <div className="RecentActivity">
                <div className="RecentActivity__Sidebar col-md-3"><Sidebar /></div>
                <h3>Recent Activity</h3>
                <LoadMore className="RecentActivity__activities col-md-9 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { this.renderChangeLogs() }
                </LoadMore>
            </div>
        );
    }

});

module.exports = RecentActivity;
