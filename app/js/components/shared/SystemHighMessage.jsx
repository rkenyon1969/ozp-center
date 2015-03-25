'use strict';

var React = require('react');
var { systemHigh } = require('ozp-react-commons/constants/messages');

var SystemHighMessage = React.createClass({

    render: function () {
        return (
            <p className="alert alert-warning">{systemHigh}</p>
        );
    }

});

module.exports = SystemHighMessage;
