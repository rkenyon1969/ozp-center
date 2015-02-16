'use strict';

var _ = require('../utils/_');
var createActions = require('../utils/createActions');
var NotificationApi = require('../webapi/Notification.js');
var ProfileActions = require('ozp-react-commons/actions/ProfileActions');

var NotificationActions = createActions({

    createNotification(uuid, notification) {
        NotificationApi.create(notification)
            .then(function (response) {
                NotificationActions.createNotificationCompleted(uuid, response);
                ProfileActions.fetchNotifications();
            })
            .fail(_.partial(NotificationActions.createNotificationFailed, uuid));
    },

    expireNotification(notification) {
        notification.expiresDate = new Date();
        NotificationApi.update(notification)
            .then(function (response) {
                NotificationActions.expireNotificationCompleted(response);
                ProfileActions.fetchNotifications();
            })
            .fail(NotificationActions.expireFailed);
    },

    fetchActive() {
        NotificationApi.fetchActive()
            .then(NotificationActions.fetchActiveCompleted)
            .fail(NotificationActions.fetchActiveFailed);
    },

    fetchPast(paginatedList) {
        var url;
        if (paginatedList && paginatedList.nextLink) {
            url = paginatedList.nextLink;
        }

        NotificationApi.fetchPast(url)
            .then(NotificationActions.fetchPastCompleted)
            .fail(NotificationActions.fetchPastFailed);
    }

});

module.exports = NotificationActions;
