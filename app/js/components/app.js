'use strict';

var React = require('react');
var Reflux = require('reflux');

var ConfigStore = require('../stores/ConfigStore');
var ProfileStore = require('../stores/ProfileStore');
var ProfileActions = require('../actions/ProfileActions');
var fetchLibrary = ProfileActions.fetchLibrary;
var fetchSelf = ProfileActions.fetchSelf;

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
        this.listenTo(ProfileStore, this.onStoreChanged);
        this.listenTo(ConfigStore, this.onStoreChanged);
        fetchLibrary();
    },

    onStoreChanged: function () {
        this.setState(getState());
    }

});

module.exports = App;
