'use strict';

var React = require('react');
var Reflux = require('reflux');
var cx = React.addons.classSet;
var _ = require('../../utils/_.js');

var UserNotifications = require('./UserNotifications.jsx');

var SelfStore = require('../../stores/SelfStore.js');
var SelfActions = require('../../actions/SelfActions.js');

var UserNotificationDropdown = React.createClass({

    mixins: [
        Reflux.listenTo(SelfStore, 'onStoreChanged')
    ],

    getInitialState() {
        return {
            notifications: null
        };
    },

    onStoreChanged() {
        this.setState({
            notifications: SelfStore.getNotifications()
        });
    },

    componentDidMount() {
        SelfActions.fetchNotifications();
    },

    render() {
        var notifications = this.state.notifications;
        var hasNotifications = notifications && notifications.length > 0;
        var bellClassNames = cx({
            'icon-bell-filled': true,
            activeIcon: hasNotifications
        });

        return (
            <li className="dropdown">
                <a href="#" data-toggle="dropdown">
                    <i className={bellClassNames}></i>
                </a>
                {
                    hasNotifications &&
                        <UserNotifications notifications={notifications} />
                }
            </li>
        );
    }

});

module.exports = UserNotificationDropdown;
