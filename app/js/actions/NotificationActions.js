'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('../constants');
var createActions = require('../utils/createActions');
var NotificationApi = require('../webapi/Notification.js');

var NotificationActions = createActions({

    createNotification(uuid, notification) {
        NotificationApi.create(notification)
            .then(_.partial(NotificationActions.createNotificationCompleted, uuid))
            .fail(_.partial(NotificationActions.createNotificationFailed, uuid));
    },

    expireNotification(notification) {
        notification.expiresDate = new Date();
        NotificationApi.update(notification)
            .then(NotificationActions.expireNotificationCompleted)
            .fail(NotificationActions.expireFailed);
    },

    fetchActive() {
        NotificationApi.fetchActive()
            .then(NotificationActions.fetchActiveCompleted)
            .fail(NotificationActions.fetchActiveFailed);
    },

    fetchPast() {
        NotificationApi.fetchPast()
            .then(NotificationActions.fetchPastCompleted)
            .fail(NotificationActions.fetchPastFailed);
    }

});

module.exports = NotificationActions;
