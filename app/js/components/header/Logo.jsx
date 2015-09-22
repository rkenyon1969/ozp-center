'use strict';

var React = require('react');
var logo  = './images/marketplace-logo.png';

var Logo = React.createClass({

    render() {
        return (
            <a href="#home" id="marketplace-logo" className="col-xs-3 col-lg-2">
                <img alt="marketplace logo click to go home" src={logo} />
            </a>
        );
    }

});

module.exports = Logo;
