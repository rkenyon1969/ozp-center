'use strict';

var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions.js');
var PaginatedList = require('../utils/PaginatedList.js');
var _notifications;

var ActiveNotificationStore = Reflux.createStore({

    init() {
        _notifications = new PaginatedList();
        this.listenTo(NotificationActions.fetchPastCompleted, this.fetchPastCompleted);
        this.listenTo(NotificationActions.expireNotificationCompleted, this.onExpireCompleted);
    },

    getNotifications() {
        return _notifications;
    },

    fetchPastCompleted(notifications) {
        _notifications.receivePage(notifications);
        this.trigger();
    },

    onExpireCompleted(notification) {
        _notifications.data.unshift(notification);
        this.trigger();
    }

});

module.exports = ActiveNotificationStore;
