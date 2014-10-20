'use strict';

var React = require('react');
var logo  = './images/appsmall-logo.png';

var Logo = React.createClass({

    /*jshint ignore:start */
    render: function () {
        return (
            <div id="logo-container">
                <a id="appsmall-logo-link"><img src={logo} /></a>
            </div>
        );
    }
    /*jshint ignore:end */

});

module.exports = Logo;
