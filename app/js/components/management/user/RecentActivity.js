'use strict';

var React = require('react');
var Reflux = require('reflux');
var { Link, Navigation, CurrentPath } = require('react-router');
var Sidebar = require('./RecentActivitySidebar');
var ListingActions = require('../../../actions/ListingActions');
var fetchAllChangeLogs = ListingActions.fetchAllChangeLogs;
var GlobalListingStore = require('../../../stores/GlobalListingStore');
var ChangeLog = require('../../shared/ChangeLog');
var LoadMore = require('../../shared/LoadMore');
var PaginatedChangeLogStore = require('../../../stores/PaginatedChangeLogStore');
var ActiveState = require('../../../mixins/ActiveStateMixin');


var RecentActivity = React.createClass({

    mixins: [Reflux.listenTo(PaginatedChangeLogStore, 'onChangeLogsReceived'), Navigation, ActiveState],

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
            var adminLinkMap = {
                'APPROVED' : 'View',
                'SUBMITTED' : 'View Submission',
                'ENABLED' : 'View',
                'DISABLED' : 'View',
                'CREATED' : 'View Draft',
                'APPROVED_ORG' : 'Review Listing',
                'REVIEW_EDITED' : 'View',
                'REVIEW_DELETED' : 'View',
            };


            var href = this.makeHref(this.getActiveRoutePath(), this.getParams(), {
                listing: changeLog.listing.id,
                action: 'view',
                tab: 'overview'
            });
            return (
                /* jshint ignore:start */
                <a href={href}>{ adminLinkMap[action] } <i className="fa fa-angle-right"></i></a>
                /* jshint ignore:end */
            );
        }
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
                <ChangeLog showListingName={true} changeLog={changeLog}>
                    <img className="recent-activity-icon" src={ changeLog.listing.iconUrl } />
                    { me.createLink(changeLog) }
                </ChangeLog>,
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
                <h3>Recent Activity</h3>
                <LoadMore className="RecentActivity__activities col-md-9 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { this.renderChangeLogs() }
                </LoadMore>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = RecentActivity;
