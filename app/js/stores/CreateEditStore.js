'use strict';

var Reflux = require('reflux');
var ListingApi = require('../webapi/Listing').ListingApi;
var Listing = require('../webapi/Listing').Listing;

//normalize arrays in a blank listing
function createDefaultSchema () {
    return {
    	categories: [],
	    contacts: [],
	    docUrls: [],
	    intents: [],
	    owners: [],
	    screenshots: [],
	    tags: []
    };
}

var _status = {
	loaded: false,
	error: false
};

var _listing;

var actions = Reflux.createActions([
	'loadListing',
	'listingLoaded',
	'loadFailed',
	'setProperty'
]);

actions.loadListing.listen(function (id) {
	if (id !== null) {
		ListingApi.getById(id)
	    	.then(actions.listingLoaded)
	    	.fail(actions.loadFailed);
    } else {
    	actions.listingLoaded(createDefaultSchema());
    }
});

var CreateEditStore = Reflux.createStore({
	init: function () {
		this.listenTo(actions.listingLoaded, this.onLoaded);
		this.listenTo(actions.loadListing, this.onLoading);
		this.listenTo(actions.loadFailed, this.onLoadError);
		this.listenTo(actions.setProperty, this.setProperty);

		this.onLoaded(createDefaultSchema());
	},

	getStatus: function () {
		return _status;
	},

	onLoading: function() {
		_status = {
			loaded: false,
			error: false
		};
		this.trigger();
	},

	getListing: function () {
		return _listing;
	},

	isLoaded: function () {
		return _status.loaded;
	},

	getError: function () {
		return _status.error;
	},

	onLoaded: function (listing) {
		_listing = listing;
		_status = {
			loaded: true,
			error: false
		};
		this.trigger();
	},

	onLoadError: function () {
		_status = {
			loaded: false,
			error: true
		};
		this.trigger();
	},

	setProperty: function(propName, propVal) {
		_listing[propName] = propVal;
		this.trigger();
	}
});

module.exports = {
	loadListing: actions.loadListing,
	setProperty: actions.setProperty,
	store: CreateEditStore
};