'use strict';

var Reflux = require('reflux');
var _ = require('../utils/_');
var { PAGINATION_MAX } = require('../constants');
var createActions = require('../utils/createActions');
var NotificationApi = require('../webapi/Notification.js');

var NotificationActions = createActions({

    create(uuid, notification) {
        NotificationApi.create(notification)
            .then(_.partial(NotificationActions.createCompleted, uuid))
            .fail(_.partial(NotificationActions.createFailed, uuid));
    },

    expire(notification) {
        notification.expiresDate = new Date();
        NotificationApi.update(notification)
            .then(NotificationActions.expireCompleted)
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
