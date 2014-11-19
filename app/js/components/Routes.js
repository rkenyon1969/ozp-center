var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var App = require('./app');
var DiscoveryPage = require('./discovery');
var CreateEditPage = require('./createEdit');
var UserManagement = require('./management/user');
var MyListings = require('./management/user/MyListings');
var RecentActivity = require('./management/user/RecentActivity');
var AppsMallManagement = require('./management/mall');
var FeedbackModal = require('./management/user/FeedbackModal');
var { ListingDeleteConfirmation } = require('./shared/DeleteConfirmation');


/*jshint ignore:start */
module.exports = (
    <Routes>
        <Route handler={App}>
            <Route path="home" name="home" handler={ DiscoveryPage } />
            <Route path="user-management" name="user-management" handler={ UserManagement }>
                <Route path="my-listings" name="my-listings" handler={ MyListings } />
                <Route path="recent-activity" name="recent-activity" handler={ RecentActivity } />
            </Route>
            <Route name="edit" path="edit/?:listingId?" handler={ CreateEditPage }/>
            <Route path="mall-management" name="mall-management" handler={ AppsMallManagement }>
                <Route path="categories" name="categories" handler={ AppsMallManagement.Categories } />
                <Route path="contact-types" name="contact-types" handler={ AppsMallManagement.ContactTypes } />
                <Route path="intents" name="intents" handler={ AppsMallManagement.Intents } />
                <Route path="organizations" name="organizations" handler={ AppsMallManagement.Organizations } />
                <Route path="stewards" name="stewards" handler={ AppsMallManagement.Stewards } />
            </Route>
            <Redirect to="home" />
        </Route>
    </Routes>
);
/*jshint ignore:end */
