'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../../utils/_.js');
var UserNotification = require('../shared/UserNotification.jsx');

var SelfStore = require('../../stores/SelfStore.js');
var SelfActions = require('../../actions/SelfActions.js');

var UserNotifications = React.createClass({

    mixins: [
        Reflux.listenTo(SelfStore, 'onStoreChanged')
    ],

    getInitialState() {
        return {
            notifications: null
        };
    },

    onStoreChanged: function () {
        this.setState({
            notifications: SelfStore.getNotifications()
        });
    },

    _renderNotification(notification) {
        return <UserNotification
            key={notification.id}
            notification={notification} />;
    },

    _renderNotifications() {
        var notifications = this.state.notifications;
        var length = notifications.length;

        return notifications.map((notification, index) => {
            var notificationComponent = this._renderNotification(notification);
            return index === length - 1 ?
                notificationComponent :
                [notificationComponent, <li className="divider"></li>];
        });
    },

    componentDidMount() {
        SelfActions.fetchNotifications();
    },

    render() {
        var notifications = this.state.notifications;


        if (notifications && notifications.length > 0) {
            return (
                <ul className="dropdown-menu">
                    { this._renderNotifications() }
                </ul>
            );
        }
        return null;
    }

});

module.exports = UserNotifications;
