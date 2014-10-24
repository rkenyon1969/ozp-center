'use strict';

var React = require('react');
var Reflux = require('reflux');
var ConfigStore = require('../../stores/ConfigStore');
var CreateEditForm = require('./createEditForm');
var GlobalListingStore = require('../../stores/GlobalListingStore');
var Listing = require('../../webapi/Listing').Listing;
var _findIndex = require('lodash/arrays/findIndex');
var $ = require('jquery');

require('bootstrap');

var editableProps = [
    'title', 'description', 'screenshots', 'contacts', 'tags', 'type',
    'versionName', 'launchUrl', 'agency', 'whatIsNew', 'agency',
    'imageLargeUrl', 'imageSmallUrl', 'imageMediumUrl', 'imageXlargeUrl',
    'categories', 'releaseDate', 'intents', 'docUrls', 'descriptionShort',
    'requirements'
];

var CreateEditPage = React.createClass({

    getInitialState: function () {
        var listing = this.props.params && this.props.params.listingId ? 
            GlobalListingStore.getById(this.props.params.listingId).clone() : new Listing();

        this.initListing(listing);

        return {
            listing: listing,
            config: ConfigStore.getConfig()
        };
    },

    render: function () {
        var me = this,
            setters = {};

        editableProps.forEach(function (prop) {
            setters[prop] = me.setPropOnListing.bind(me, prop);
        });

        setters.owners = function (usernames) {
            me.setPropOnListing('owners', usernames.map(function (username) {
                return {username: username};
            }));
        };

        /*jshint ignore:start */
        return <CreateEditForm setters={setters} listing={this.state.listing} config={this.state.config} />;
        /*jshint ignore:end */
    },
    

    componentDidMount: function () {
        this._$scrollspy = $('body').scrollspy({
            target: '#create-edit-tab-container'
        }).data('bs.scrollspy');
    },

    setPropOnListing: function (prop, val) {
        this.state.listing[prop](val);
        this.setState({listing: this.state.listing});
    },

    componentWillUnmount: function () {
        this._$scrollspy.$scrollElement.off('scroll.bs.scrollspy');
        this._$scrollspy.$body.removeData('bs.scrollspy');
    },

    initListing: function (listing) {
        var config = this.props.config;

        /**
         *     Add Required Contacts
         */
        var requiredContacts = [];

        var requiredContactTypes = config.contactTypes.filter(function (type) {
            return type.required;
        });

        requiredContactTypes.forEach(function (type, index) {
            var requiredIndex = _findIndex(listing.contacts(), function (contact) {
                return contact.type === type.title;
            });

            if (requiredIndex > -1) {
                requiredContacts.push(listing.contacts().splice(requiredIndex, 1));
            } else {
                requiredContacts.push({ type: type });
            }
        });

        listing.contacts(requiredContacts.splice(listing.contacts()));

        /**
         *     Add Required Screenshots
         */
        if (listing.screenshots().length < 1) {
            listing.screenshots().push({});
        }

        /**
         *     Set the Default Listing Type
         */
        if (!listing.type()) {
            listing.type(config.types[0].title);
        }

        /**
         *     Add Suggested Resources
         */
        var suggestedResources = [];

        ['User Manual', 'API Documentation'].forEach(function (name) {
            var index = _findIndex(listing.docUrls(), function (resource) {
                return resource.name === name;
            });

            if (index > -1) {
                suggestedResources.push(listing.docUrls().splice(index, 1));
            } else {
                suggestedResources.push({name: name});
            }
        });

        listing.docUrls(suggestedResources.splice(listing.docUrls()));

        /**
         *      Add the default owner
         */
        if (listing.owners().length === 0) {
            //TODO:
        }
    }
});

module.exports = CreateEditPage;
