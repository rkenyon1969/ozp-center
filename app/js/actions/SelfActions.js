'use strict';

var Reflux = require('reflux');
var { SelfApi } = require('../webapi/Self');
var createActions = require('../utils/createActions');

var SelfActions = createActions({
    fetchLibrary() {
        SelfApi.getLibrary()
            .then(SelfActions.fetchLibraryCompleted);
    },

    fetchSelf() {
        SelfApi.getSelf()
            .done(SelfActions.fetchSelfCompleted)
            .fail(SelfActions.fetchSelfFailed);
    },

    fetchNotifications() {
        SelfApi.fetchNotifications()
            .done(SelfActions.fetchNotificationsCompleted)
            .fail(SelfActions.fetchNotificationsFailed);
    },

    dismissNotification(notification) {
        SelfApi.dismissNotification(notification.id)
            .done(function () {
                SelfActions.dismissNotificationCompleted(notification);
            })
            .fail(function () {
                SelfActions.dismissNotificationFailed(notification);
            });
    }
});

SelfActions.selfLoaded = Reflux.createAction();

module.exports = SelfActions;
