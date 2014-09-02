/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

var Header = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="user-menu" className="dropdown navbar-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="fa fa-bars"></i>
                </a>
                <ul className="dropdown-menu" role="menu">
                    <li><a href="#new"><i className="fa fa-plus"></i> Create Listing</a></li>
                    <li><a href="#"><i className="fa fa-list"></i> My Listings</a></li>
                    <li><a href="#"><i className="fa fa-sign-out"></i> Logout</a></li>
                </ul>
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = Header;