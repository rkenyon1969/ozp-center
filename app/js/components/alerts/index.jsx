'use strict';

var React = require('react');

var Alerts = React.createClass({

    render: function () {
        return (
            <ul className="dropdown-menu">
                <li>
                    <a href="#">
                        <button type="button" className="close notifications pull-right"><span aria-hidden="true">×</span></button>
                        <img className="img-thumbnail pull-left" src="https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot32.png" />
                        <span>Writing down for maintenance</span><br /><i className="small">12/12/12 00:00</i>
                    </a>
                </li>
                <li className="divider"></li>
                <li>
                    <a href="#">
                        <button type="button" className="close notifications"><span aria-hidden="true">×</span></button>
                        <img className="img-thumbnail pull-left" src="https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/AirMail32.png" />
                        <span>Airplanes down for maintenance</span><br /><i className="small">12/12/12 00:00</i>
                    </a>
                </li>
                <li className="divider"></li>
                <li>
                    <a href="#">
                        <button type="button" className="close notifications"><span aria-hidden="true">×</span></button>
                        <img className="img-thumbnail pull-left" src="https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChatterBox32.png" />
                        <span>Chat down for maintenance</span><br /><i className="small">12/12/12 00:00</i>
                    </a>
                </li>
            </ul>
        );
    }

});

module.exports = Alerts;
