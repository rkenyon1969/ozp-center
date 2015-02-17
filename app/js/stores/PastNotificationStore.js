'use strict';

var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions.js');
var PaginatedList = require('../utils/PaginatedList.js');

var _resetNotifications = false;
var resetNotifications = function () {
    _resetNotifications = true;
    NotificationActions.fetchPast();
};

NotificationActions.createNotificationCompleted.listen(resetNotifications);
NotificationActions.expireNotificationCompleted.listen(resetNotifications);

var _notifications;

var PastNotificationStore = Reflux.createStore({

    init() {
        _notifications = new PaginatedList();
        this.listenTo(NotificationActions.fetchPastCompleted, this.fetchPastCompleted);
        this.listenTo(NotificationActions.expireNotificationCompleted, this.onExpireCompleted);
    },

    getNotifications() {
        return _notifications;
    },

    fetchPastCompleted(notifications) {
        if (_resetNotifications) {
            _notifications = new PaginatedList(notifications);
            _resetNotifications = false;
        }
        else {
            _notifications.receivePage(notifications);
        }
        this.trigger();
    },

    onExpireCompleted(notification) {
        _notifications.data.unshift(notification);
        this.trigger();
    }

});

module.exports = PastNotificationStore;
