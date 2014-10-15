/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Tab = require('../../../mixins/TabMixin');

// component dependencies
var Header = require('../../header');

var ListingManagement = React.createClass({

    mixins: [ Tab ],

    getDefaultProps: function() {
        return {
            tabs: [{
                to: 'categories',
                name: 'Categories'
            }, {
                to: 'tags',
                name: 'Tags'
            }, {
                to: 'intents',
                name: 'Intents'
            }, {
                to: 'organizations',
                name: 'Organizations'
            }, {
                to: 'stewards',
                name: 'Stewards'
            }]
        };
    },

    render: function () {

        /* jshint ignore:start */
        return (
            <div className="MallManagement">
                <Header />
                <div className="MallManagement__body">
                    <h1>AppsMall Management</h1>
                    <div className="MallManagement__TabContainer">
                        { this.renderTabs(this.props.tabs) }
                        <div className="tab-content">
                            <this.props.activeRouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ListingManagement;
module.exports.Intents = require('./Intents');
