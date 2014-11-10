'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var ConfigStore = require('../stores/ConfigStore');
var ProfileStore = require('../stores/ProfileStore');
var ProfileActions = require('../actions/ProfileActions');
var fetchLibrary = ProfileActions.fetchLibrary;
var fetchSelf = ProfileActions.fetchSelf;

// component dependencies
var DiscoveryPage = require('./discovery');
var CreateEditPage = require('./createEdit');
var UserManagement = require('./management/user');
var MyListings = require('./management/user/MyListings');
var RecentActivity = require('./management/user/RecentActivity');
var AppsMallManagement = require('./management/mall');
var Quickview = require('./quickview');
var FeedbackModal = require('./management/user/FeedbackModal');
var ListingDeleteConfirmation =
    require('./shared/DeleteConfirmation').ListingDeleteConfirmation;

function getState () {
    return {
        currentUser: ProfileStore.getSelf(),
        library: ProfileStore.getLibrary(),
        config: ConfigStore.getConfig()
    };
}

var App = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function() {
        return getState();
    },

    render: function () {
        var { config, library, currentUser } = this.state;

        if(!config || !library || !currentUser) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }
        return this.props.activeRouteHandler({
            config: this.state.config
        });
    },

    componentWillMount: function () {
        fetchLibrary();
        fetchSelf();
    },

    componentDidMount: function () {
        this.listenTo(ProfileStore, this.onStoreChanged);
        this.listenTo(ConfigStore, this.onStoreChanged);
    },

    onStoreChanged: function () {
        this.setState(getState());
    }

});

/*jshint ignore:start */
React.renderComponent(
    <Routes>
        <Route handler={App}>
            <Route name="home" path="home" handler={ DiscoveryPage }>
                <Route name="quickview" path="quickview/:listingId" handler={ Quickview }>
                    <Route name="quickview-overview" path="overview" handler={ Quickview.OverviewTab } />
                    <Route name="quickview-reviews" path="reviews" handler={ Quickview.ReviewsTab } />
                    <Route name="quickview-details" path="details" handler={ Quickview.DetailsTab } />
                    <Route name="quickview-resources" path="resources" handler={ Quickview.ResourcesTab } />
                    <Route name="quickview-administration" path="administration" handler={ Quickview.AdministrationTab } />
                </Route>
            </Route>
            <Route name="new" path="/new" handler={ CreateEditPage } />
            <Route name="edit" path="edit/:listingId" handler={ CreateEditPage } />
            <Route name="user-management" path="user-management" handler={ UserManagement }>
                <Route name="my-listings" path="listings" handler={ MyListings }>
                    <Route name="feedback" path="feedback/:listingId"
                        handler={ FeedbackModal } />
                    <Route name="delete" path="delete/:listingId"
                        handler={ListingDeleteConfirmation} />
                </Route>
                <Route name="recent-activity" path="recent-activity" handler={ RecentActivity } />
            </Route>
            <Route name="mall-management" path="mall-management" handler={ AppsMallManagement }>
                <Route name="categories" path="categories" handler={ AppsMallManagement.Categories } />
                <Route name="contact-types" path="contact-types" handler={ AppsMallManagement.ContactTypes } />
                <Route name="intents" path="intents" handler={ AppsMallManagement.Intents } />
                <Route name="organizations" path="organizations" handler={ AppsMallManagement.Organizations } />
                <Route name="stewards" path="stewards" handler={ AppsMallManagement.Stewards } />
            </Route>
            <Redirect to="home" />
        </Route>
    </Routes>,
    document.getElementById('main')
);
/*jshint ignore:end */
