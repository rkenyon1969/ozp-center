/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Header = require('./header');
var DiscoveryPage = require('./discovery');
var CreateEditPage = require('./createEdit');

var APP = React.createClass({

    render: function () {
        return this.renderCreateEditPage();
        // return this.renderDiscoveryPage();
    },

    /*jshint ignore:start */
    renderDiscoveryPage: function () {
        return (
            <DiscoveryPage />
        );
    },
    /*jshint ignore:end */

    /*jshint ignore:start */
    renderCreateEditPage: function () {
        return (
            <CreateEditPage />
        );
    }
    /*jshint ignore:end */

});

module.exports = APP;
