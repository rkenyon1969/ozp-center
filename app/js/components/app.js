/** @jsx React.DOM */
'use strict';

var React          = require('react/addons'),
    Header         = require('./header'),
    DiscoveryPage  = require('./discovery'),
    CreateEditPage = require('./createEdit');

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
    }
    /*jshint ignore:end */

});

module.exports = APP;
