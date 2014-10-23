'use strict';

var React = require('react');
var Reflux = require('reflux');
var CreateEditStore = require('../../stores/CreateEditStore').store;
var ConfigStore = require('../../stores/ConfigStore').store;
var CreateEditForm = require('./createEditForm');
var setProperty = require('../../stores/CreateEditStore').setProperty;
var loadListing = require('../../stores/CreateEditStore').loadListing;
var $ = require('jquery');

require('bootstrap');

var setters = {};

var editableProps = [
    'title', 'description', 'screenshots', 'contacts', 'tags', 'type',
    'versionName', 'launchUrl', 'agency', 'whatIsNew', 'agency',
    'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'categories', 'releaseDate', 'intents', 'docUrls', 'descriptionShort',
    'requirements'
];

editableProps.forEach(function (prop) {
    setters[prop] = function (val) {
        setProperty(prop, val);
    };
});

setters.owners = function (usernames) {
    setProperty('owners', usernames.map(function (username) {
        return {username: username};
    }));
};

var CreateEditPage = React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return { 
            listingLoaded: CreateEditStore.isLoaded(),
            listing: CreateEditStore.getListing(),
            config: ConfigStore.getConfig()
        };
    },

    /*jshint ignore:start */
    render: function () {
        if (!this.state.listingLoaded) {
            return <p>Loading...</p>;
        } else {
            return <CreateEditForm setters={setters} listing={this.state.listing} config={this.state.config} />;
        }
    },
    /*jshint ignore:end */

    componentDidMount: function () {
        var me = this;

        this.listenTo(CreateEditStore, function () {
            me.setState({
                listingLoaded: CreateEditStore.isLoaded(),
                listing: CreateEditStore.getListing(),
                config: ConfigStore.getConfig()
            });
        });

        this._$scrollspy = $('body').scrollspy({
            target: '#create-edit-tab-container'
        }).data('bs.scrollspy');
    },

    componentWillMount: function () {
        loadListing(1);
    },

    componentWillUnmount: function () {
        this.state.listing.off('update');
        this._$scrollspy.$scrollElement.off('scroll.bs.scrollspy');
        this._$scrollspy.$body.removeData('bs.scrollspy');
    }
});

module.exports = CreateEditPage;
