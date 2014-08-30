/** @jsx React.DOM */
'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Header           = require('./header'),
    DiscoveryPage    = require('./discovery'),
    CreateEditPage   = require('./createEdit'),
    fetchConfig      = require('../actions/ConfigActions').fetchConfig,
    ConfigStoreMixin = require('../stores/ConfigStore').mixin;

var APP = React.createClass({
    mixins: [ConfigStoreMixin],

    render: function () {
        if(!this.state.config.loaded) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }

        return this.renderCreateEditPage();
        return this.renderDiscoveryPage();
    },

    /*jshint ignore:start */
    renderDiscoveryPage: function () {
        return (
            <DiscoveryPage />
        );
    },

    renderCreateEditPage: function () {
        return (
            <CreateEditPage config={this.state.config} />
        );
    },
    /*jshint ignore:end */

    componentWillMount: function () {
        fetchConfig();
    }
});

module.exports = APP;
