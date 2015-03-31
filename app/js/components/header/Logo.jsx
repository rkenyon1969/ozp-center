'use strict';

var React = require('react');
var logo  = './images/marketplace-logo.png';

var Logo = React.createClass({

    render() {
        return (
            <a href="#home" id="marketplace-logo">
                <img src={logo} />
            </a>
        );
    }

});

module.exports = Logo;
