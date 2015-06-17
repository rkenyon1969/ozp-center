'use strict';

var React = require('react');
var _Date = require('ozp-react-commons/components/Date.jsx');
var Time = require('ozp-react-commons/components/Time.jsx');
var NotificationActions = require('../../../../actions/NotificationActions.js');

var ActiveNotification = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    statics: {
        fromArray: function (notifications) {
            if (notifications) {
                return notifications.map(function (notification) {
                    return <ActiveNotification key={notification.id} notification={notification}/>;
                });
            }
        }
    },

    onStopClick() {
        NotificationActions.expireNotification(this.props.notification);
    },

    render() {
        var { expiresDate, message } = this.props.notification;

        return (
            <div className="ActiveNotification">
                <div className="ActiveNotification__Header">
                    <h5 style={{margin: 0, fontWeight: 400}}>AppsMall</h5>
                    <em>Expires: <_Date date={expiresDate} /> at <Time date={expiresDate} /></em>


                    <button className="btn btn-link" onClick={this.onStopClick}><i className="icon-ban-12-blueDark"></i></button>
                </div>
                <p>{ message }</p>
            </div>
        );
    }
});

module.exports = ActiveNotification;
