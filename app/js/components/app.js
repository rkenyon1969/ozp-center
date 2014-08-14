/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Header = require('./header');
<<<<<<< HEAD
var Search = require('./search');

var Dropdown = require('./dropdown');

=======
var DiscoveryPage = require('./discovery');
>>>>>>> createEdit
var CreateEditPage = require('./createEdit');


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
            <CreateEditPage />
        );
    }
    /*jshint ignore:end */

});

module.exports = APP;
