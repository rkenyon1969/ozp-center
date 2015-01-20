'use strict';

var React = require('react');
var Router = require('react-router');
var { RouteHandler } = Router;
var Tab = require('../../../mixins/TabMixin');
var AdminRoute = require('../../../mixins/AdminRouteMixin');
var SystemStore = require('../../../stores/SystemStore');

// component dependencies
var Header = require('../../header');

var MallManagement = React.createClass({

    mixins: [ Tab, AdminRoute ],

    statics: {
        willTransitionFrom: function (transition, component) {
            // refresh config cache when transitioning away
            SystemStore.loadSystem();
        }
    },

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'categories',
                name: 'Categories'
            }, {
                to: 'contact-types',
                name: 'Contact Types'
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
                            <RouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = MallManagement;
module.exports.Categories = require('./Categories');
module.exports.ContactTypes = require('./ContactTypes');
module.exports.Organizations = require('./Organizations');
module.exports.Intents = require('./Intents');
module.exports.Stewards = require('./Stewards');
