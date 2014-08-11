/** @jsx React.DOM */

var React = require('react/addons');
var UserMenu = require('./UserMenu');
var logo  = './images/appsmall-logo.png';

var Header = React.createClass({

    render: function () {
        return (
            <div id="header">
                <div id="logo-container">
                    <a id="appsmall-logo-link"><img src={logo} /></a>
                </div>
                <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                </form>
                <UserMenu />
            </div>
        );
    }

});



module.exports = Header;