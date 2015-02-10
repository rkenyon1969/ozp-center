'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var NotificationActions = require('../actions/NotificationActions.js');

var _notifications;

var NotificationStore = Reflux.createStore({

    init() {
        this.listenTo(NotificationActions.fetchActiveCompleted, this.fetchActiveCompleted);
        this.listenTo(NotificationActions.createCompleted, this.onCreateCompleted);
    },

    getNotifications() {
        return _notifications;
    },

    fetchActiveCompleted(notifications) {
        _notifications = notifications.getItemAsList();
        this.trigger();
    },

    onCreateCompleted(uuid, notification) {
        _notifications.unshift(notification);
        this.trigger();
    }

});

module.exports = NotificationStore;
