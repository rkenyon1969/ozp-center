'use strict';

var React = require('react/addons');

var Logo = require('./Logo');
var UserMenu = require('./UserMenu');

var Header = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <div id="header">
                <div className="row">
                    <Logo />
                    { this.props.children }
                    <UserMenu />
                </div>
                <div className="row">
                    <div className="spacer"></div>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }

});



module.exports = Header;
