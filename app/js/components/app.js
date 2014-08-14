/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Header = require('./header');
var DiscoveryPage = require('./search');
var CreateEditPage = require('./createEdit');

var APP = React.createClass({

    render: function () {
        return this.renderCreateEditPage();
        // return this.renderSearchPage();
    },

    /*jshint ignore:start */
    renderSearchPage: function () {
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
