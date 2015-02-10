'use strict';

var React = require('react');
var Reflux = require('reflux');
var NotificationActions = require('../../../../actions/NotificationActions.js');
var uuid = require('../../../../utils/uuid.js');

var CreateNotification = React.createClass({

    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.listenTo(NotificationActions.createCompleted, 'onNotificationCreated')
    ],

    getInitialState() {
        return {
            uuid: uuid(),
            expiresDate: new Date(new Date().getTime() + (250*60*1000)),
            message: ''
        };
    },

    onReset(event) {
        event.preventDefault();
        this.setState({
            uuid: uuid(),
            expiresDate: new Date(new Date().getTime() + (250*60*1000)),
            message: ''
        });
    },

    onSend(event) {
        event.preventDefault();
        console.log(this.state);
        NotificationActions.create(this.state.uuid, this.state);
    },

    onNotificationCreated(uuid, notification) {
        if (this.state.uuid === uuid) {
            this.onReset();
        }
    },

    render() {
        return (
            <div>
                <h4 style={{marginTop: 0}}>Send a Notification</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="notification-expires-time">Notification text</label>
                        <input type="date" className="form-control" placeholder="Enter the text for the notification" name="notification-expires-time"  valueLink={this.linkState('expiresDate')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notification-message">Notification text</label>
                        <textarea className="form-control" placeholder="Enter the text for the notification" name="notification-message" valueLink={this.linkState('message')}></textarea>
                    </div>
                    <div className="pull-right">
                        <button className="btn btn-default btn-small" onClick={ this.onReset }>Reset</button>
                        <button className="btn btn-success btn-small" disabled onClick={ this.onSend }>Send</button>
                    </div>
                </form>
            </div>
        );
    }

});

module.exports = CreateNotification;
