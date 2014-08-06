/** @jsx React.DOM */

var React = require('react/addons');

var Header = React.createClass({

    render: function () {
        return (
            <div id="user-menu" className="dropdown navbar-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="glyphicon glyphicon-align-justify"></i>
                </a>
                <ul className="dropdown-menu" role="menu">
                    <li><a href="#"><i className="glyphicon glyphicon-book"></i> Help</a></li>
                    <li><a href="#"><i className="glyphicon glyphicon-off"></i> Logout</a></li>
                </ul>
            </div>
        );
    }

});



module.exports = Header;