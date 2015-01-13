'use strict';

var React = require('react');
var Tab = require('../../../mixins/TabMixin');
var { Link, RouteHandler } = require('react-router');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var ActiveStateMixin = require('../../../mixins/ActiveStateMixin');
var _ = require('../../../utils/_');

// component dependencies
var Header = require('../../header');

var ListingManagement = React.createClass({

    mixins: [ Tab, SystemStateMixin ],

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'recent-activity',
                name: 'Recent Activity'
            }, {
                to: 'all-listings',
                name: 'All AML Listings'
            }, {
                to: 'my-listings',
                name: 'My Listings'
            }]
        };
    },

    getActiveTab: function(tabs){
        var me = this;
        return _.find(tabs, function(tab) {
            return me.isActive(tab.to);
        });
    },

    render: function () {
        var me = this;

        var tabs = _.cloneDeep(this.props.tabs);
        if(!this.state.currentUser.isAdmin){
            tabs.splice(1, 1);
        }

        if(this.state.currentUser.stewardedOrganizations.length > 0){
            _.forEach(this.state.currentUser.stewardedOrganizations, function(orgName){
                var org = _.find(me.state.system.organizations, function(orgObj) {
                    return orgObj.title === orgName;
                });

                tabs.splice(1, 0,
                {
                    to: org.title,
                    name: 'All ' + org.shortName + ' Listings'
                });
            });
        }

        /* jshint ignore:start */
        return (
            <div className="ListingManagement">
                <Header />
                <div className="ListingManagement__body">
                    <h1>Listing Management</h1>
                    <Link to="edit"><button type="button" className="btn btn-primary ListingManagement__CreateListingButton">Create New Listing</button></Link>
                    <div className="ListingManagement__TabContainer">
                        { this.renderTabs(tabs) }
                        <div className="tab-content">
                            <RouteHandler org={this.getActiveTab(tabs)}/>
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
