/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./header');
var Search = require('./search');
var CreateEditPage = require('./createEdit');

var APP = React.createClass({

    render: function () {
        return this.renderCreateEditPage();
        // return this.renderSearchPage();
    },

    renderSearchPage: function () {
        /*jshint ignore:start */
        return (
            <div>
                <Header />
                <Search />
            </div>
        );
    },

    renderCreateEditPage: function () {
        return (
            <CreateEditPage />
        );
        /*jshint ignore:end */
    }

});

module.exports = APP;
