'use strict';

var { Route, Redirect } = require('react-router');
var App = require('./app.jsx');
var DiscoveryPage = require('./discovery/index.jsx');
var UserManagement = require('./management/user/index.jsx');
var CreateEditPage = require('./createEdit/index.jsx');
var AppsMallManagement = require('./management/mall/index.jsx');
var AllListings = require('./management/AllListings.jsx');
var OrgListings = require('./management/OrgListings.jsx');

module.exports = function (childRoutes) {

    var routes = [
        <Route path="home" name="home" handler={ DiscoveryPage } />,
        <Route path="user-management" name="user-management" handler={ UserManagement }>
            <Route path="my-listings" name="my-listings" handler={ UserManagement.MyListings } />
            <Route path="recent-activity" name="recent-activity" handler={ UserManagement.RecentActivity } />
            <Route path="all-listings" name="all-listings" handler={ AllListings } />
            <Route path="org-listings/:org" name="org-listings" handler={ OrgListings } />
        </Route>,
        <Route path="edit/?:listingId?" name="edit"  handler={ CreateEditPage } />,
        <Route path="mall-management" name="mall-management" handler={ AppsMallManagement }>
            <Route path="categories" name="categories" handler={ AppsMallManagement.Categories } />
            <Route path="contact-types" name="contact-types" handler={ AppsMallManagement.ContactTypes } />
            <Route path="intents" name="intents" handler={ AppsMallManagement.Intents } />
            <Route path="organizations" name="organizations" handler={ AppsMallManagement.Organizations } />
            <Route path="stewards" name="stewards" handler={ AppsMallManagement.Stewards } />
            <Route path="notifications" name="notifications" handler={ AppsMallManagement.Notifications } />
        </Route>
    ];
    if (childRoutes) {
        routes = routes.concat(childRoutes);
    }
    routes.push(<Redirect to="home" />);

    return (
        <Route handler={App}>
            { routes }
        </Route>
    );
};
