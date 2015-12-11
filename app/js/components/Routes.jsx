'use strict';

var { Route, Redirect, paramInjectTrailingSlashMatcher } = require('react-router');
var App = require('./app.jsx');
var DiscoveryPage = require('./discovery/index.jsx');
var UserManagement = require('./management/user/index.jsx');
var CreateEditPage = require('./createEdit/index.jsx');
var AppsMallManagement = require('./management/mall/index.jsx');
var AllListings = require('./management/AllListings/index.jsx');
var OrgListings = require('./management/OrgListings/index.jsx');

module.exports = function (childRoutes) {

    var routes = [
        <Redirect from='/' to="home"/>,
        <Route path="home/?" name="home" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString/:categories/:type/:org/?" name="fifteen" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString/:categories/:type//?" name="fourteen" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString/:categories//:org/?" name="thirteen" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString/:categories///?" name="twelve" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString//:type/:org/?" name="eleven" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString//:type//?" name="ten" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString///:org/?" name="nine" key="home" handler={ DiscoveryPage }/>,
        <Route path="home/:searchString////?" name="eight" key="home" handler={ DiscoveryPage }/>,
        <Route path="home//:categories/:type/:org/?" name="seven" key="home" handler={ DiscoveryPage }/>,
        <Route path="home//:categories/:type//?" name="six" key="home" handler={ DiscoveryPage }/>,
        <Route path="home//:categories//:org/?" name="five" key="home" handler={ DiscoveryPage }/>,
        <Route path="home//:categories///?" name="four" key="home" handler={ DiscoveryPage }/>,
        <Route path="home///:type/:org/?" name="three" key="home" handler={ DiscoveryPage }/>,
        <Route path="home///:type//?" name="two" key="home" handler={ DiscoveryPage }/>,
        <Route path="home////:org/?" name="one" key="home" handler={ DiscoveryPage }/>,
        <Route path="user-management" name="user-management" key="user-management" handler={ UserManagement }>
            <Route path="my-listings" name="my-listings" key="my-listings" handler={ UserManagement.MyListings } />
            <Route path="recent-activity" name="recent-activity" key="recent-activity" handler={ UserManagement.RecentActivity } />
            <Route path="all-listings" name="all-listings" key="all-listings" handler={ AllListings } />
            <Route path="org-listings/:org" name="org-listings" key="org-listings" handler={ OrgListings } />
        </Route>,
        <Route path="edit/?:listingId?" name="edit"  key="edit"  handler={ CreateEditPage } />,
        <Route path="mall-management" name="mall-management" key="mall-management" handler={ AppsMallManagement }>
            <Route path="categories" name="categories" key="categories" handler={ AppsMallManagement.Categories } />
            <Route path="contact-types" name="contact-types" key="contact-types" handler={ AppsMallManagement.ContactTypes } />
            <Route path="intents" name="intents" key="intents" handler={ AppsMallManagement.Intents } />
            <Route path="organizations" name="organizations" key="organizations" handler={ AppsMallManagement.Organizations } />
            <Route path="stewards" name="stewards" key="stewards" handler={ AppsMallManagement.Stewards } />
            <Route path="notifications" name="notifications" key="notifications" handler={ AppsMallManagement.Notifications } />
        </Route>
    ];
    if (childRoutes) {
        routes = routes.concat(childRoutes);
    }

    return (
        <Route handler={App}>
            { routes }
        </Route>
    );
};
