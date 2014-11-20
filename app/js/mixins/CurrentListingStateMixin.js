'use strict';

var Reflux = require('reflux');
var CurrentListingStore = require('../stores/CurrentListingStore');
var { loadListing } = require('../actions/CreateEditActions');

module.exports = {
    mixins: [Reflux.connect(CurrentListingStore)],

    getInitialState: function () {
        return CurrentListingStore.getDefaultData();
    }
};