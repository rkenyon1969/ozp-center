'use strict';

var Reflux = require('reflux');

var OzpAnalytics = require('../analytics/ozp-analytics');

var LibraryActions = Reflux.createActions([
    'fetchLibrary',
    'addToLibrary',
    'removeFromLibrary'
]);

LibraryActions.addToLibrary.listen(function(listing) {
    OzpAnalytics.trackEvent('Favorited Applications', listing.title);
});

module.exports = LibraryActions;
