'use strict';

var React = require('react');
var { PropTypes } = React;
var _Date = require('./Date.jsx');
var Time = require('./Time.jsx');

var SelfActions = require('../../actions/SelfActions.js');

var UserNotification = React.createClass({

    propTypes: {
        notification: PropTypes.object.isRequired
    },

    onDismiss(event) {
        event.preventDefault();
        event.stopPropagation();
        SelfActions.dismissNotification(this.props.notification);
    },

    render() {
        var { expiresDate, message } = this.props.notification;
        return (
            <li className="UserNotification">
                <a href="#">
                    <button type="button" className="close notifications pull-right">
                        <span aria-hidden="true" onClick={this.onDismiss}>×</span>
                    </button>
                    <img className="img-thumbnail pull-left" src="https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot32.png" />
                    <p>{message}</p>
                    <i className="small">
                        <_Date date={expiresDate} />
                        <Time date={expiresDate} />
                    </i>
                </a>
            </li>
        );
    }

});

module.exports = UserNotification;
