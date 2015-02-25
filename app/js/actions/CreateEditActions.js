'use strict';

var Reflux = require('reflux');

module.exports = Reflux.createActions([
	'listingCreated', 'updateListing',
	'save', 'submit', 'saveSucceeded',
    'discard'
]);
