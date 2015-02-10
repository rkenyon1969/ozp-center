'use strict';

var React = require('react');
var Reflux = require('reflux');
var CreateNotification = require('./CreateNotification.jsx');
var ActiveNotification = require('./ActiveNotification.jsx');
var PastNotifications = require('./PastNotification.jsx');

var NotificationsStore = require('../../../../stores/NotificationStore.js');
var NotificationActions = require('../../../../actions/NotificationActions.js');

var ActiveNotifications = React.createClass({
    mixins: [
        Reflux.listenTo(NotificationsStore, 'onStoreChanged')
    ],
    getInitialState() {
        return {
            notifications: null
        };
    },
    onStoreChanged() {
        this.setState({
            notifications: NotificationsStore.getNotifications()
        });
    },
    componentDidMount() {
        if (!NotificationsStore.getNotifications()) {
            NotificationActions.fetchActive();
        }
    },
    render() {
        var notificationComponents = ActiveNotification.fromArray(this.state.notifications);
        return (
            <div>
                <h4 style={{marginTop: 0}}>ActiveNotifications</h4>
                { notificationComponents }
            </div>
        );
    }
});

var PastNotifications = React.createClass({
    render() {
        return (
            <div>
                PastNotifications
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
