'use strict';

var React = require('react');
var { systemHigh } = require('../../constants/messages');

var SystemHighMessage = React.createClass({

    render: function () {
        /*jshint ignore:start */
        return (
            <p className="text-danger">{systemHigh}</p>
        );
        /*jshint ignore:end */
    }

});

module.exports = SystemHighMessage;
