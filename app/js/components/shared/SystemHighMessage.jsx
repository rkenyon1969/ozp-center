'use strict';

var React = require('react');
var { systemHigh } = require('../../constants/messages');

var SystemHighMessage = React.createClass({

    render: function () {
        return (
            <p className="text-danger">{systemHigh}</p>
        );
    }

});

module.exports = SystemHighMessage;
