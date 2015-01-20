'use strict';

var React = require('react');
var logo  = './images/marketplace-logo.png';

var Logo = React.createClass({

    /*jshint ignore:start */
    render: function () {
        return (
            <div id="logo-container">
                <a href="#home" id="appsmall-logo-link"><img src={logo} /></a>
            </div>
        );
    }
    /*jshint ignore:end */

});

module.exports = Logo;
