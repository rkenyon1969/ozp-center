'use strict';

var React = require('react');
var Tab = require('../../../mixins/TabMixin');
var { Link, RouteHandler } = require('react-router');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var _ = require('../../../utils/_');

// component dependencies
var NavBar = require('../../NavBar/index.jsx');
var Header = require('../../header/index.jsx');

var ListingManagement = React.createClass({

    mixins: [ Tab, SystemStateMixin ],

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'recent-activity',
                name: 'Recent Activity'
            }, {
                to: 'all-listings',
                name: 'All Marketplace Listings'
            }, {
                to: 'my-listings',
                name: 'My Listings'
            }]
        };
    },

    getActiveTab: function(tabs) {
        var me = this;
        return _.find(tabs, function(tab) {
            return me.isActive(tab.to, tab.params);
        });
    },

    render: function () {
        var { currentUser, system } = this.state;
        var tabs = _.cloneDeep(this.props.tabs);

        if(!currentUser.isAdmin) {
            tabs.splice(1, 1);
        }

        if(currentUser.stewardedOrganizations.length > 0 && system.organizations.length > 0) {
            _.forEach(currentUser.stewardedOrganizations, function(orgName) {
                var org = _.find(system.organizations, function(orgObj) {
                    return orgObj.title === orgName;
                });

                tabs.splice(2, 0, {
                    to: 'org-listings',
                    name: org.shortName + ' Listings',
                    params: {
                        org: org.title
                    }
                });
            });
        }

        return (
            <div className="ListingManagement">
                <NavBar />
                <Header />
                <div className="ListingManagement__body">
                    <h1>Listing Management</h1>
                      <div className="ListingManagement__TabContainer">
                        { this.renderTabs(tabs) }
                        <div className="tab-content">
                            <RouteHandler org={this.getActiveTab(tabs)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = ListingManagement;
module.exports.MyListings = require('./MyListings.jsx');
module.exports.RecentActivity = require('./RecentActivity.jsx');
