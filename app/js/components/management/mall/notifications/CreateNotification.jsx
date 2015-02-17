'use strict';

var React = require('react');
var Reflux = require('reflux');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var Select = require('../../../shared/Select.jsx');

var _ = require('../../../../utils/_.js');
var uuid = require('../../../../utils/uuid.js');
var NotificationActions = require('../../../../actions/NotificationActions.js');

var CreateNotification = React.createClass({

    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.listenTo(NotificationActions.createNotificationCompleted, 'onNotificationCreated')
    ],

    getDefaultProps() {
        return {
            minDate: moment(),
            hours: _.range(0, 24).map((x) => {
                return x < 10 ? `0${x}` : `${x}`;
            }),
            minutes: ['00', '15', '30', '45', '59']
        };
    },

    getInitialState() {
        return {
            uuid: uuid(),
            date: null,
            message: '',
            hour: '00',
            minute: '00'
        };
    },

    onReset(event) {
        if (event) {
            event.preventDefault();
        }

        this.setState({
            uuid: uuid(),
            date: null,
            message: '',
            hour: '00',
            minute: '00'
        });
    },

    onExpiresDateChange(date) {
        this.setState({date: date});
    },

    onMessageChange(event) {
        var { value } = event.target;
        this.setState({message: value.substring(0, 150)});
    },

    onSend(event) {
        event.preventDefault();
        var { message, date, hour, minute } = this.state;
        var expiresDate = new Date(
            Date.UTC(date.year(), date.month(), date.date(), parseInt(hour, 10), parseInt(minute, 10))
        );

        NotificationActions.createNotification(this.state.uuid, {
            expiresDate: expiresDate,
            message: message
        });
    },

    onNotificationCreated(uuid, notification) {
        if (this.state.uuid === uuid) {
            this.onReset();
        }
    },

    render() {
        return (
            <div className="CreateNotification">
                <h4 style={{marginTop: 0}}>Send a Notification</h4>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="notification-expires-time">Expires On</label>
                                <DatePicker
                                    placeholderText="MM/DD/YYYY"
                                    selected={ this.state.date }
                                    minDate= { this.props.minDate }
                                    dateFormat={ "MM/DD/YYYY" }
                                    onChange= { this.onExpiresDateChange }
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Expires At (Zulu Time)</label>
                                <div>
                                    <Select ref="hour" name="hour" options={ this.props.hours } valueLink={ this.linkState('hour') } />
                                    <Select ref="minute" name="minute" options={ this.props.minutes } valueLink={ this.linkState('minute') } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notification-message">Notification text</label>
                        <textarea ref="message" rows="5" className="form-control" placeholder="Enter the text for the notification" name="notification-message"
                            value={this.state.message} onChange={this.onMessageChange}></textarea>
                    </div>
                    <div className="pull-right">
                        <button className="btn btn-default btn-small" onClick={ this.onReset }>Reset</button>
                        <button
                            ref="send"
                            className="btn btn-success btn-small"
                            disabled={!this.state.message || !this.state.date}
                            onClick={ this.onSend }
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }

});

module.exports = CreateNotification;
