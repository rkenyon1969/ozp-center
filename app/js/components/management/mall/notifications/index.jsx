'use strict';

var React = require('react');
var Reflux = require('reflux');
var CreateNotification = require('./CreateNotification.jsx');
var ActiveNotification = require('./ActiveNotification.jsx');
var PastNotification = require('./PastNotification.jsx');
var LoadMore = require('../../../shared/LoadMore.jsx');

var ActiveNotificationsStore = require('../../../../stores/ActiveNotificationStore.js');
var PastNotificationsStore = require('../../../../stores/PastNotificationStore.js');
var NotificationActions = require('../../../../actions/NotificationActions.js');

var ActiveNotifications = React.createClass({
    mixins: [
        Reflux.listenTo(ActiveNotificationsStore, 'onStoreChanged')
    ],
    getInitialState() {
        return {
            notifications: this.notifications().data
        };
    },

    onStoreChanged() {
        this.setState({
            notifications: this.notifications().data
        });
    },

    notifications: function () {
        return ActiveNotificationsStore.getNotifications();
    },

    componentDidMount() {
        var notifications = this.notifications();
        var { hasMore } = notifications;
        if (hasMore) {
            NotificationActions.fetchActive();
        }
    },

    render() {
        var notificationComponents = ActiveNotification.fromArray(this.state.notifications);
        if (!notificationComponents || notificationComponents.length === 0) {
            notificationComponents = <span>None found.</span>;
        }
        return (
            <div>
                <h4 style={{marginTop: 0}}>Active Notifications</h4>
                { notificationComponents }
            </div>
        );
    }
});

var PastNotifications = React.createClass({
    mixins: [
        Reflux.listenTo(PastNotificationsStore, 'onStoreChanged')
    ],

    getState() {
        var notificationList = this.notifications();
        return {
            notifications: notificationList.data,
            hasMore: notificationList.hasMore
        };
    },

    getInitialState() {
        return this.getState();
    },

    onStoreChanged() {
        this.setState(this.getState());
    },

    notifications: function () {
        return PastNotificationsStore.getNotifications();
    },

    fetchMore() {
        var { hasMore } = this.state;
        if (hasMore) {
            NotificationActions.fetchPast(this.notifications());
        }
    },

    componentDidMount() {
        if (!this.state.notifications || this.state.notifications.length === 0) {
            this.fetchMore();
        }
    },

    render() {
        return (
            <div>
                <h4 style={{marginTop: 0}}>Past Notifications</h4>
                <LoadMore hasMore={this.state.hasMore} onLoadMore={this.fetchMore}>
                    { PastNotification.fromArray(this.state.notifications) }
                </LoadMore>
            </div>
        );
    }
});

var Notifications = React.createClass({

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <CreateNotification />
                </div>
                <div className="col-md-4">
                    <ActiveNotifications />
                </div>
                <div className="col-md-4">
                    <PastNotifications />
                </div>
            </div>
        );
    }

});

module.exports = Notifications;
