/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Redirect = Router.Redirect;
var DiscoveryPage = require('./discovery');
var CreateEditPage = require('./createEdit');
var ConfigStoreMixin = require('../stores/ConfigStore').mixin;
var ProfileStore = require('../stores/ProfileStore');
var Quickview = require('./quickview');
var ConfigActions = require('../actions/ConfigActions');
var fetchConfig = ConfigActions.fetchConfig;
var ProfileActions = require('../actions/ProfileActions');
var fetchLibrary = ProfileActions.fetchLibrary;

var App = React.createClass({

    mixins: [ ConfigStoreMixin ],

    getInitialState: function() {
        return {
            libraryFetched: false 
        };
    },

    render: function () {
        if(!this.state.config.loaded || !this.state.libraryFetched) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }
        return this.props.activeRouteHandler({
            config: this.state.config
        });
    },

    componentWillMount: function () {
        fetchConfig();
        fetchLibrary();
    },

    componentDidMount: function () {
        this.listenTo(ProfileStore, this.onStoreChanged);
    },

    onStoreChanged: function () {
        this.setState({
            libraryFetched: true,
            library: ProfileStore.getLibrary()
        });
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
                </Route>
            </Route>
            <Route name="new" path="/new" handler={ CreateEditPage } />
            <Redirect to="home" />
        </Route>
    </Routes>,
    document.getElementById('main')
);
/*jshint ignore:end */