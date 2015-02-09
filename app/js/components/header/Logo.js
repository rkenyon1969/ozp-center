'use strict';

var React = require('react');
var logo  = './images/marketplace-logo.png';

var Logo = React.createClass({

    /*jshint ignore:start */
    render() {
        return (
            <a href="#home" id="appsmall-logo">
                <img src={logo} />
            </a>
        );
    }
    /*jshint ignore:end */

});

module.exports = Logo;
