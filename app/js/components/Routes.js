var { Route, DefaultRoute, Redirect, RouteHandler } = require('react-router');
var App = require('./app');
var DiscoveryPage = require('./discovery');
var UserManagement = require('./management/user');
var MyListings = require('./management/user/MyListings');
var RecentActivity = require('./management/user/RecentActivity');
var CreateEditPage = require('./createEdit');
var AppsMallManagement = require('./management/mall');


/*jshint ignore:start */
module.exports = (
    <Route handler={App}>
        <Route path="home" name="home" handler={ DiscoveryPage } />
        <Route path="user-management" name="user-management" handler={ UserManagement }>
            <Route path="my-listings" name="my-listings" handler={ MyListings } />
            <Route path="recent-activity" name="recent-activity" handler={ RecentActivity } />
        </Route>
        <Route path="edit/?:listingId?" name="edit"  handler={ CreateEditPage } />
        <Route path="mall-management" name="mall-management" handler={ AppsMallManagement }>
            <Route path="categories" name="categories" handler={ AppsMallManagement.Categories } />
            <Route path="contact-types" name="contact-types" handler={ AppsMallManagement.ContactTypes } />
            <Route path="intents" name="intents" handler={ AppsMallManagement.Intents } />
            <Route path="organizations" name="organizations" handler={ AppsMallManagement.Organizations } />
            <Route path="stewards" name="stewards" handler={ AppsMallManagement.Stewards } />
        </Route>
        <Redirect to="home" />
    </Route>
);
/*jshint ignore:end */
