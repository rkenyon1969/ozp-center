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
            .then(function (response) {
                NotificationActions.fetchActive();
                NotificationActions.expireCompleted(response);
            })
            .fail(NotificationActions.expireFailed);
    },

    fetchActive() {
        NotificationApi.fetchActive()
            .then(_.partial(NotificationActions.fetchActiveCompleted))
            .fail(_.partial(NotificationActions.fetchActiveFailed));
    }

});

module.exports = NotificationActions;
