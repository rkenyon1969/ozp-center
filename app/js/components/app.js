/** @jsx React.DOM */
'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Header           = require('./header'),
    DiscoveryPage    = require('./discovery'),
    CreateEditPage   = require('./createEdit'),
    fetchConfig      = require('../actions/ConfigActions').fetchConfig,
    ConfigStoreMixin = require('../stores/ConfigStore').mixin,
    Router           = require('react-router'),
    Route            = Router.Route,
    DefaultRoute     = Router.DefaultRoute,
    Routes           = Router.Routes;

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
            <DefaultRoute handler={DiscoveryPage}/>
            <Route name="new" path="new" handler={CreateEditPage}/>
        </Route>
    </Routes>,
    document.getElementById('main')
);
/*jshint ignore:end */