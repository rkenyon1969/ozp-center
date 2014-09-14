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
var Quickview = require('./quickview');

var fetchConfig = require('../actions/ConfigActions').fetchConfig;
var ConfigStoreMixin = require('../stores/ConfigStore').mixin;

var App = React.createClass({

    mixins: [ ConfigStoreMixin ],

    render: function () {
        if(!this.state.config.loaded) {
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