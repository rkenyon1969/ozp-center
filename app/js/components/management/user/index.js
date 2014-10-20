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
                to: 'recent-activity',
                name: 'Recent Activity'
            }, {
                to: 'my-listings',
                name: 'My Listings'
            }]
        };
    },

    render: function () {
        var activeRoute = this.props.activeRouteHandler();

        /* jshint ignore:start */
        return (
            <div className="ListingManagement">
                <Header />
                <div className="ListingManagement__body">
                    <h1>Listing Management</h1>
                    <div className="ListingManagement__TabContainer">
                        { this.renderTabs(this.props.tabs) }
                        <div className="tab-content">
                            { activeRoute }
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ListingManagement;
module.exports.MyListings = require('./MyListings');
module.exports.RecentActivity = require('./RecentActivity');
