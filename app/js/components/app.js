/** @jsx React.DOM */
'use strict';

var React          = require('react/addons'),
    Reflux         = require('reflux'),
    Header         = require('./header'),
    DiscoveryPage  = require('./discovery'),
    CreateEditPage = require('./createEdit'),
    fetchConfig    = require('../actions/ConfigActions').fetchConfig;

var APP = React.createClass({
    render: function () {
        return this.renderCreateEditPage();
        // return this.renderDiscoveryPage();
    },

    /*jshint ignore:start */
    renderSearchPage: function () {
        return (
            <div>
                <Header />
                <Search />
            </div>
          );
    },

    renderDiscoveryPage: function () {
        return (
            <DiscoveryPage />
        );
    },

    renderCreateEditPage: function () {
        return (
            <CreateEditPage config={this.props.config} />
        );
    },
    /*jshint ignore:end */

    componentWillMount: function () {
        fetchConfig();
    }
});

module.exports = APP;
